"use client";

import { useState, useEffect } from "react";
import TextList from "./TextList";
import TranslationEditor from "./TranslationEditor";
import UiTextForm from "./UiTextForm";
import { useUiTexts } from "@/app/[locale]/admin/hooks/useUiTexts";
import { useTranslations } from "@/app/[locale]/admin/hooks/useTranslations";
import { createClient } from "@/utils/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Mode = "view" | "create" | "edit";
type Props = { initialUiTexts: any[]; initialLanguages: string[] };

export default function AdminTranslationManager({
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
  };

  const handleSaveTranslation = async () => {
    if (!selectedTextId) return;
    for (const lang_code of initialLanguages) {
      await supabase.from("ui_text_translations").upsert({
        ui_text_id: selectedTextId,
        lang_code,
        value: translations[lang_code] || "",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">🗂 UI 텍스트 목록</h2>
            <Button onClick={() => setMode("create")}>생성</Button>
          </div>
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
        </CardContent>
      </Card>

      <div>
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
