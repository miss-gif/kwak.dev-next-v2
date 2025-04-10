"use client";

import TranslationEditor from "@/app/[locale]/admin/TranslationEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminTranslationManager() {
  const [uiTexts, setUiTexts] = useState([]);
  const [selectedTextId, setSelectedTextId] = useState<number | null>(null);
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [languages, setLanguages] = useState<string[]>([]);
  const [newKey, setNewKey] = useState("");
  const [newHref, setNewHref] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editingText, setEditingText] = useState<any>(null);
  const [createMode, setCreateMode] = useState<any>(false);

  useEffect(() => {
    fetchUiTexts();
    fetchLanguages();
  }, []);

  useEffect(() => {
    if (selectedTextId) {
      fetchTranslations(selectedTextId);
    } else {
      setTranslations({});
    }
  }, [selectedTextId]);

  const fetchUiTexts = async () => {
    const { data } = await supabase.from("ui_texts").select("*").order("id");
    if (data) setUiTexts(data);
  };

  const fetchLanguages = async () => {
    const { data } = await supabase.from("languages").select("code");
    if (data) setLanguages(data.map((l) => l.code));
  };

  const fetchTranslations = async (textId: number) => {
    const { data } = await supabase
      .from("ui_text_translations")
      .select("lang_code, translated_text")
      .eq("ui_text_id", textId);
    if (data) {
      const result: Record<string, string> = {};
      data.forEach((row) => {
        result[row.lang_code] = row.translated_text;
      });
      setTranslations(result);
    }
  };

  const handleAddUiText = async () => {
    if (!newKey) return;
    await supabase.from("ui_texts").insert({
      key: newKey,
      href: newHref || null,
      description: newDescription || null,
    });
    setNewKey("");
    setNewHref("");
    setNewDescription("");
    fetchUiTexts();
  };

  const handleDeleteUiText = async (id: number) => {
    await supabase.from("ui_texts").delete().eq("id", id);
    if (selectedTextId === id) setSelectedTextId(null);
    fetchUiTexts();
  };

  const handleEditUiText = async () => {
    if (!editingText) return;
    await supabase
      .from("ui_texts")
      .update({
        key: editingText.key,
        href: editingText.href,
        description: editingText.description,
      })
      .eq("id", editingText.id);
    setEditingText(null);
    fetchUiTexts();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">🗂 UI 텍스트 목록</h2>

            <Button
              onClick={() => {
                setCreateMode(!createMode);
                setEditingText(null);
                setSelectedTextId(null);
              }}
            >
              생성
            </Button>
          </div>

          {createMode && (
            <div className="space-y-2">
              <Label>Key</Label>
              <Input
                placeholder="Key"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
              />
              <Label>Href</Label>
              <Input
                placeholder="Href"
                value={newHref}
                onChange={(e) => setNewHref(e.target.value)}
              />
              <Label>Description</Label>
              <Textarea
                placeholder="Description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
              <Button onClick={handleAddUiText}>추가</Button>
            </div>
          )}

          <div className="space-y-2">
            {uiTexts.map((t) => (
              <div
                key={t.id}
                className={`flex flex-col space-y-1 p-2 border rounded cursor-pointer hover:bg-gray-100 ${selectedTextId === t.id ? "bg-gray-200" : ""}`}
                onClick={() => setSelectedTextId(t.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">key : {t.key}</p>
                    <p className="text-xs text-gray-500">href : {t.href}</p>
                    <p className="text-xs text-gray-500">
                      description : {t.description}
                    </p>
                  </div>
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingText(t);
                      }}
                    >
                      수정
                    </Button>
                    <Button
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteUiText(t.id);
                      }}
                    >
                      삭제
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {editingText && (
            <div className="space-y-2 mt-4 border-t pt-4">
              <h3 className="text-md font-medium">✏️ UI 텍스트 수정</h3>
              <Label>Key</Label>
              <Input
                placeholder="Key"
                value={editingText.key}
                onChange={(e) =>
                  setEditingText({ ...editingText, key: e.target.value })
                }
              />
              <Label>Href</Label>
              <Input
                placeholder="Href"
                value={editingText.href || ""}
                onChange={(e) =>
                  setEditingText({ ...editingText, href: e.target.value })
                }
              />
              <Label>Description</Label>
              <Textarea
                placeholder="Description"
                value={editingText.description || ""}
                onChange={(e) =>
                  setEditingText({
                    ...editingText,
                    description: e.target.value,
                  })
                }
              />
              <Button onClick={handleEditUiText}>수정 저장</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedTextId && (
        <TranslationEditor
          selectedTextId={selectedTextId}
          translations={translations}
          setTranslations={setTranslations}
          languages={languages}
          fetchTranslations={fetchTranslations}
        />
      )}
    </div>
  );
}
