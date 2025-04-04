"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { supabase } from "../../../../utils/supabase/client";

interface NewNoteProps {
  fetchNotes: () => Promise<void>; // 노트 목록을 새로고침하는 함수
  setIsCreating: (isCreating: boolean) => void; // 새 노트 작성 상태를 설정하는 함수
  setActiveNoteId: (id: number) => void; // 활성화된 노트 ID를 설정하는 함수
}

const NewNote = ({
  fetchNotes,
  setIsCreating,
  setActiveNoteId,
}: NewNoteProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 노트를 저장하는 함수
  const handleSave = async () => {
    if (!title || !content) {
      alert("제목과 내용을 입력하세요.");
      return;
    }

    const { data, error } = await supabase
      .from("note")
      .insert({ title, content })
      .select();

    if (error) {
      console.error("Error saving note:", error);
      return;
    }

    await fetchNotes(); // 저장 후 노트 목록 새로고침
    setActiveNoteId(data[0].id); // 새로 생성된 노트를 활성화
    setIsCreating(false); // 새 노트 작성 창 닫기
  };

  // 노트 작성을 취소하는 함수
  const handleCancel = () => {
    setTitle(""); // 제목 입력 필드 초기화
    setContent(""); // 내용 입력 필드 초기화
    setIsCreating(false); // 새 노트 작성 창 닫기
  };

  return (
    <div className="w-full p-4 space-y-2">
      {/* 제목 입력 필드 */}
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력하세요"
      />

      {/* 내용 입력 필드 */}
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 입력하세요"
        className="resize-none h-96"
        rows={10}
      />

      {/* 저장 버튼 */}
      <Button className="w-full" onClick={handleSave}>
        저장
      </Button>

      {/* 취소 버튼 */}
      <Button className="w-full" onClick={handleCancel} variant={"outline"}>
        취소
      </Button>
    </div>
  );
};

export default NewNote;
