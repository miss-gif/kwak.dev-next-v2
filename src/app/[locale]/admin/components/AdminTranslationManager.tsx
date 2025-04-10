"use client";

import UiTextForm from "@/app/[locale]/admin/components/UiTextForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Database } from "../../../../../types_db";

// Supabase 클라이언트 생성
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 모드 타입 정의: 조회, 생성, 수정 모드
type Mode = "view" | "create" | "edit";

// 데이터베이스 테이블 타입 정의
type UiTextTranslationsRow =
  Database["public"]["Tables"]["ui_text_translations"]["Row"];
type UiTextTranslationsRowInsert =
  Database["public"]["Tables"]["ui_text_translations"]["Insert"];
type UiTextTranslationsRowUpdate =
  Database["public"]["Tables"]["ui_text_translations"]["Update"];
type UiTextsRow = Database["public"]["Tables"]["ui_texts"]["Row"];

export default function AdminTranslationManager() {
  // UI 텍스트 목록 상태
  const [uiTexts, setUiTexts] = useState<UiTextsRow[]>([]);
  // 선택된 텍스트 ID 상태
  const [selectedTextId, setSelectedTextId] = useState<number | null>(null);
  // 번역 데이터 상태 (언어코드: 번역텍스트)
  const [translations, setTranslations] = useState<Record<string, string>>({});
  // 지원 언어 목록 상태
  const [languages, setLanguages] = useState<string[]>([]);
  // 새 UI 텍스트 생성 관련 상태
  const [newKey, setNewKey] = useState("");
  const [newHref, setNewHref] = useState("");
  const [newDescription, setNewDescription] = useState("");
  // 현재 편집 중인 텍스트 상태
  const [editingText, setEditingText] = useState<any>(null);
  // 현재 모드 상태(조회/생성/편집)
  const [mode, setMode] = useState<Mode>("view");

  // 컴포넌트 마운트 시 UI 텍스트 및 언어 목록 가져오기
  useEffect(() => {
    fetchUiTexts();
    fetchLanguages();
  }, []);

  // 선택된 텍스트가 변경될 때 해당 번역 데이터 가져오기
  useEffect(() => {
    if (selectedTextId) {
      fetchTranslations(selectedTextId);
      console.log("선택된 텍스트 ID:", selectedTextId);
    } else {
      setTranslations({});
      console.log("선택된 텍스트 없음");
    }
  }, [selectedTextId]);

  // UI 텍스트 목록을 가져오는 함수
  const fetchUiTexts = async () => {
    const { data } = await supabase.from("ui_texts").select("*").order("id");
    if (data) setUiTexts(data);
  };

  // 지원 언어 목록을 가져오는 함수
  const fetchLanguages = async () => {
    const { data } = await supabase.from("languages").select("code");
    if (data) setLanguages(data.map((l) => l.code));
  };

  // 특정 텍스트의 번역 데이터를 가져오는 함수
  const fetchTranslations = async (textId: number) => {
    const { data } = await supabase
      .from("ui_text_translations")
      .select("lang_code, translated_text")
      .eq("ui_text_id", textId);
    if (data) {
      console.log("번역 데이터:", data);

      // 언어코드를 키로, 번역 텍스트를 값으로 하는 객체 생성
      const result: Record<string, string> = {};
      data.forEach((row) => {
        result[row.lang_code] = row.translated_text;
      });
      setTranslations(result);
    }
  };

  // 특정 텍스트의 번역 데이터를 가져오는 함수
  const test = async (textId: number) => {
    const { data } = await supabase
      .from("ui_text_translations")
      .select("translated_text"); // 번역 데이터 가져오기
    // .eq("ui_text_id", textId); // ui_text_id로 필터링
    if (data) {
      console.log("번역 데이터:", data);
    }
  };

  // 새 UI 텍스트 추가 처리 함수
  const handleAddUiText = async () => {
    if (!newKey) return; // 키는 필수값

    // languages가 비어 있다면 직접 불러오기
    console.log(languages); // ['ko', 'en', 'ja']

    if (languages.length === 0) {
      console.log("언어 목록이 비어 있습니다. 새 언어 목록을 가져옵니다.");
      const { data } = await supabase.from("languages").select("code");
      if (data) setLanguages(data.map((l) => l.code));
    }

    // 1. ui_texts 테이블에 레코드 삽입
    const { data: insertedTexts, error: insertError } = await supabase
      .from("ui_texts")
      .insert({
        key: newKey,
        href: newHref || null,
        description: newDescription || null,
      })
      .select(); // 삽입된 데이터 반환

    if (insertError || !insertedTexts || insertedTexts.length === 0) {
      console.error("UI 텍스트 생성 오류:", insertError);
      return;
    }

    const newTextId = insertedTexts[0].id; // 새로 생성된 UI 텍스트의 ID
    console.log("새 UI 텍스트 ID:", newTextId);

    // 2. 각 언어별로 빈 번역 레코드 생성
    const insertTranslations = languages.map((lang) => ({
      ui_text_id: newTextId,
      lang_code: lang,
      translated_text: "빈 문자",
    }));

    const { error: translationsError } = await supabase
      .from("ui_text_translations")
      .insert(insertTranslations);

    if (translationsError) {
      console.error("번역 생성 오류:", translationsError);
    }

    // 3. 상태 초기화
    setNewKey("");
    setNewHref("");
    setNewDescription("");
    setMode("view");

    // 4. UI 텍스트 목록 갱신
    fetchUiTexts();
  };

  // UI 텍스트 삭제 처리 함수
  const handleDeleteUiText = async (id: number) => {
    await supabase.from("ui_texts").delete().eq("id", id);
    // 현재 선택된 텍스트가 삭제된 경우 선택 상태 초기화
    if (selectedTextId === id) setSelectedTextId(null);
    // 목록 갱신
    fetchUiTexts();
  };

  // UI 텍스트 수정 처리 함수
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
    setMode("view");
    fetchUiTexts();
  };

  // 모드 변경 함수 (조회/생성/편집)
  const changeMode = (newMode: Mode, text?: any) => {
    setMode(newMode);

    // 모드에 따라 다른 상태 초기화
    if (newMode === "view") {
      // view 모드로 전환 시 선택된 텍스트만 유지하고 편집 상태 초기화
      setEditingText(null);
    } else if (newMode === "create") {
      // create 모드로 전환 시 모든 선택/편집 상태 초기화
      setSelectedTextId(null);
      setEditingText(null);
      setNewKey("");
      setNewHref("");
      setNewDescription("");
    } else if (newMode === "edit") {
      // edit 모드로 전환 시 선택된 텍스트 초기화하고 편집 텍스트 설정
      setSelectedTextId(null);
      setEditingText(text);
    }
  };

  // UI 텍스트 선택 함수
  const selectText = (textId: number) => {
    setSelectedTextId(textId);
    setMode("view");
    setEditingText(null);
  };

  // 번역 저장 처리 함수
  const handleSaveTranslation = async () => {
    if (!selectedTextId) return;
    // 모든 지원 언어에 대해 번역 데이터 업데이트
    for (const lang_code of languages) {
      const text = translations[lang_code] || "";
      await supabase.from("ui_text_translations").upsert({
        ui_text_id: selectedTextId,
        lang_code,
        translated_text: text,
      });
    }
    // 번역 데이터 갱신
    fetchTranslations(selectedTextId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 좌측 패널: UI 텍스트 목록 */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">🗂 UI 텍스트 목록</h2>

            <Button onClick={() => changeMode("create")}>생성</Button>
          </div>

          <div className="mt-4">
            <div className="space-y-2 w-full">
              {/* UI 텍스트 아이템 목록 */}
              {uiTexts.map((t) => (
                <div
                  key={t.id}
                  className={`flex flex-col space-y-1 p-2 border rounded cursor-pointer hover:bg-gray-100 w-full ${selectedTextId === t.id ? "bg-gray-200" : ""}`}
                  onClick={() => selectText(t.id)}
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
                      {/* 텍스트 수정 버튼 */}
                      <Button
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation(); // 클릭 이벤트 전파 방지
                          changeMode("edit", t);
                        }}
                      >
                        수정
                      </Button>
                      {/* 텍스트 삭제 버튼 */}
                      <Button
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation(); // 클릭 이벤트 전파 방지
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
          </div>
        </CardContent>
      </Card>

      {/* 우측 패널: 모드에 따라 다른 컨텐츠 표시 */}
      <div>
        {/* 조회 모드: 선택된 텍스트의 번역 관리 */}
        {mode === "view" && selectedTextId && (
          <div>
            <div className="p-4 space-y-4">
              <h2 className="text-lg font-semibold">🌍 번역 관리</h2>
              <div>ui_texts ID : {selectedTextId}</div>
              {languages.map((lang) => (
                <div key={lang} className="flex space-x-2 flex-col">
                  <Label>{lang.toUpperCase()}</Label>
                  <Input
                    value={translations[lang] || ""}
                    onChange={(e) =>
                      setTranslations({
                        ...translations,
                        [lang]: e.target.value,
                      })
                    }
                    className="flex-1"
                  />
                </div>
              ))}
              <Button onClick={handleSaveTranslation}>
                번역관리 수정 저장
              </Button>
            </div>
          </div>
        )}

        {/* 생성 모드: 새 UI 텍스트 생성 폼 */}
        {mode === "create" && (
          <div>
            <h3 className="text-md font-medium mb-3">✨ 새 UI 텍스트 생성</h3>
            <UiTextForm
              textData={{
                key: newKey,
                href: newHref,
                description: newDescription,
              }}
              setTextData={({ key, href, description }) => {
                if (key !== undefined) setNewKey(key);
                if (href !== undefined) setNewHref(href || "");
                if (description !== undefined)
                  setNewDescription(description || "");
              }}
              onSubmit={handleAddUiText}
              onCancel={() => changeMode("view")}
              submitLabel="생성"
            />
          </div>
        )}

        {/* 편집 모드: UI 텍스트 수정 폼 */}
        {mode === "edit" && editingText && (
          <div>
            <h3 className="text-md font-medium mb-3">✏️ UI 텍스트 수정</h3>
            <UiTextForm
              textData={editingText}
              setTextData={setEditingText}
              onSubmit={handleEditUiText}
              onCancel={() => changeMode("view")}
              submitLabel="수정"
            />
          </div>
        )}
      </div>
    </div>
  );
}
