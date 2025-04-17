"use client";

import { useTranslations } from "@/app/[locale]/admin/i18n/hooks/useTranslations";
import { useUiTexts } from "@/app/[locale]/admin/i18n/hooks/useUiTexts";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import TextList from "./TextList";
import TranslationEditor from "./TranslationEditor";
import UiTextForm from "./UiTextForm";
import { toast } from "sonner";

type Mode = "view" | "create" | "edit";
type Props = { initialUiTexts: any[]; initialLanguages: string[] };

export default function TranslationManager({
  initialUiTexts,
  initialLanguages,
}: Props) {
  const { uiTexts, setUiTexts, fetchUiTexts, deleteUiText } = useUiTexts();
  const [selectedTextId, setSelectedTextId] = useState<number | null>(null);
  const [mode, setMode] = useState<Mode>("view");
  const [editingText, setEditingText] = useState<any>(null);
  const [newText, setNewText] = useState({
    namespace: "",
    key: "",
    url: "",
    description: "",
  });

  const { translations, setTranslations } = useTranslations(selectedTextId);
  const supabase = createClient();

  useEffect(() => {
    fetchUiTexts();
  }, []);

  const handleAdd = async () => {
    if (!newText.namespace || !newText.key) return;
    const { data } = await supabase.from("ui_texts").insert(newText).select();
    if (!data) return;

    const insertTranslations = initialLanguages.map((lang) => ({
      ui_text_id: data[0].id,
      lang_code: lang,
      value: "값이 비어있습니다.",
    }));

    await supabase.from("ui_text_translations").insert(insertTranslations);
    setNewText({ namespace: "", key: "", url: "", description: "" });
    setMode("view");
    fetchUiTexts();
    toast.success("텍스트 생성 완료!");
  };

  const handleSaveTranslation = async () => {
    if (!selectedTextId) return;

    const updates = initialLanguages.map((lang_code) => ({
      ui_text_id: selectedTextId,
      lang_code,
      value: translations[lang_code] || "",
    }));

    const { error } = await supabase
      .from("ui_text_translations")
      .upsert(updates, {
        onConflict: "ui_text_id,lang_code", // Important: tells Supabase how to resolve conflicts
      });

    toast.success("번역관리 수정 완료!");

    if (error) {
      toast.error("번역관리 수정 실패!");
      console.error("Failed to upsert translations:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="w-full">
        <header className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">🗂 UI 텍스트 목록</h2>
          <Button onClick={() => setMode("create")}>생성</Button>
        </header>

        <TextList
          uiTexts={uiTexts}
          selectedTextId={selectedTextId}
          onSelect={(id) => {
            setSelectedTextId(id);
            setMode("view");
          }}
          onEdit={(text) => {
            setEditingText(text);
            setMode("edit");
          }}
          onDelete={(id) => {
            deleteUiText(id);
            if (selectedTextId === id) setSelectedTextId(null);
          }}
        />
      </div>

      <div className="w-full">
        {mode === "view" && selectedTextId && (
          <TranslationEditor
            textId={selectedTextId}
            translations={translations}
            setTranslations={setTranslations}
            languages={initialLanguages}
            onSave={handleSaveTranslation}
          />
        )}
        {mode === "create" && (
          <UiTextForm
            textData={newText}
            setTextData={setNewText}
            onSubmit={handleAdd}
            onCancel={() => setMode("view")}
            submitLabel="생성"
          />
        )}
        {mode === "edit" && editingText && (
          <UiTextForm
            textData={editingText}
            setTextData={setEditingText}
            onSubmit={async () => {
              await supabase
                .from("ui_texts")
                .update(editingText)
                .eq("id", editingText.id);
              setMode("view");
              fetchUiTexts();
            }}
            onCancel={() => setMode("view")}
            submitLabel="수정"
          />
        )}
      </div>
    </div>
  );
}
