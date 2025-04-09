"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";

type Note = {
  id: number;
  title: string;
  content: string;
};

type ViewerNoteProps = {
  activeNote: Note;
  setActiveNoteId: (id: number | null) => void;
  fetchNotes: () => Promise<void>;
};

const ViewerNote = ({
  activeNote,
  setActiveNoteId,
  fetchNotes,
}: ViewerNoteProps) => {
  const [title, setTitle] = useState(activeNote?.title);
  const [content, setContent] = useState(activeNote?.content);
  const [isEditing, setIsEditing] = useState(false);
  const supabase = createClient(); // Supabase 클라이언트 생성

  const handleSave = async () => {
    if (!title || !content) {
      alert("제목과 내용을 입력하세요.");
      return;
    }

    const { data, error } = await supabase
      .from("note")
      .update({ title, content })
      .eq("id", activeNote?.id)
      .select();

    if (error) {
      console.error("Error saving note:", error);
      return;
    }

    fetchNotes(); // 노트 목록 새로고침
    setActiveNoteId(data[0].id); // 새로 생성된 노트를 활성화
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(activeNote?.title);
    setContent(activeNote?.content);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    const { error } = await supabase
      .from("note")
      .delete()
      .eq("id", activeNote?.id);

    if (error) {
      console.error("Error saving note:", error);
      return;
    }

    setActiveNoteId(null); // 노트 삭제 후 활성화된 노트 ID를 null로 설정
    setIsEditing(false);
    fetchNotes(); // 노트 목록 새로고침
  };

  useEffect(() => {
    setTitle(activeNote?.title);
    setContent(activeNote?.content);
    setIsEditing(false);
  }, [activeNote]);

  return (
    <div className="w-full p-4 space-y-2">
      {isEditing ? (
        <div className="space-y-2 min-h-2/5">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요."
          />
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요."
            className="resize-none h-96"
            rows={10}
          />
        </div>
      ) : (
        <div className="space-y-2 min-h-2/5">
          <h1 className="text-2xl font-bold">{activeNote?.title}</h1>
          <p>{activeNote?.content}</p>
        </div>
      )}

      <div className="flex gap-2">
        {isEditing ? (
          <>
            <Button onClick={handleSave}>저장</Button>
            <Button variant={"outline"} onClick={handleCancel}>
              취소
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => setIsEditing(true)}>수정</Button>
            <Button variant={"outline"} onClick={handleDelete}>
              삭제
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewerNote;
