"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../utils/supabase/client";

const ViewerNote = ({ note, setActiveNoteId, fetchNotes }) => {
  const [title, setTitle] = useState(note?.title);
  const [content, setContent] = useState(note?.content);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    if (!title || !content) {
      alert("제목과 내용을 입력하세요.");
      return;
    }

    const { data, error } = await supabase
      .from("note")
      .update({ title, content })
      .eq("id", note?.id)
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
    setTitle(note?.title);
    setContent(note?.content);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    const { error } = await supabase.from("note").delete().eq("id", note?.id);

    if (error) {
      console.error("Error saving note:", error);
      return;
    }

    setActiveNoteId(null); // 노트 삭제 후 활성화된 노트 ID를 null로 설정
    setIsEditing(false);
    fetchNotes(); // 노트 목록 새로고침
  };

  useEffect(() => {
    setTitle(note?.title);
    setContent(note?.content);
    setIsEditing(false);
  }, [note]);

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
          <h1 className="text-2xl font-bold">{note?.title}</h1>
          <p>{note?.content}</p>
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
