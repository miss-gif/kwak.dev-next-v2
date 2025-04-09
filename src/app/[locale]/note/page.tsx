"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import BackButton from "@/components/back-button";
import { Database } from "../../../../types_db";
import { createClient } from "@/utils/supabase/client";
import NewNote from "@/app/[locale]/note/components/new-note";
import ViewerNote from "@/app/[locale]/note/components/viewer-note";
import EmptyNote from "@/app/[locale]/note/components/empty-note";
import Header from "@/app/[locale]/note/components/header";
import Sidebar from "@/app/[locale]/note/components/sidebar";

export default function Page() {
  // 활성화된 노트의 ID를 저장하는 상태
  const [activeNoteId, setActiveNoteId] = useState<number | null>(null);
  // 새로운 노트를 생성 중인지 여부를 저장하는 상태
  const [isCreating, setIsCreating] = useState(false);
  // 노트 목록을 저장하는 상태
  const [notes, setNotes] = useState<
    Database["public"]["Tables"]["note"]["Row"][]
  >([]);
  // 검색어를 저장하는 상태
  const [search, setSearch] = useState<string>("");
  const supabase = createClient(); // Supabase 클라이언트 생성

  // 노트를 가져오는 함수
  const fetchNotes = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("note")
        .select("*")
        .ilike("title", `%${search}%`); // 제목에 검색어가 포함된 노트를 검색
      if (error) throw error;
      setNotes(data || []); // 가져온 노트를 상태에 저장
    } catch (error) {
      console.error("Error fetching notes:", error); // 에러 로그 출력
    }
  }, [search]);

  // 컴포넌트가 마운트되거나 검색어가 변경될 때 노트를 가져옴
  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // 활성화된 노트를 계산
  const activeNote = useMemo(
    () =>
      notes.find((note) => note.id === activeNoteId) ?? {
        id: null,
        title: "",
        content: "",
      },
    [activeNoteId, notes]
  );

  // 렌더링할 콘텐츠를 결정
  const renderContent = useMemo(() => {
    if (isCreating) {
      // 새로운 노트를 생성 중일 때
      return (
        <NewNote
          fetchNotes={fetchNotes}
          setIsCreating={setIsCreating}
          setActiveNoteId={setActiveNoteId}
        />
      );
    }
    if (activeNoteId && activeNote.id !== null) {
      // 특정 노트가 활성화되어 있을 때
      return (
        <ViewerNote
          activeNote={activeNote}
          setActiveNoteId={setActiveNoteId}
          fetchNotes={fetchNotes}
        />
      );
    }
    // 아무 노트도 활성화되지 않았을 때
    return <EmptyNote />;
  }, [isCreating, activeNoteId, activeNote, fetchNotes]);

  return (
    <div className="w-full flex flex-col">
      <BackButton />
      <Header />
      <div className="grow flex">
        <Sidebar
          notes={notes} // 노트 목록
          setIsCreating={setIsCreating} // 새로운 노트 생성 상태 변경 함수
          setActiveNoteId={setActiveNoteId} // 활성화된 노트 ID 변경 함수
          activeNoteId={activeNoteId} // 활성화된 노트 ID
          search={search} // 검색어
          setSearch={setSearch} // 검색어 변경 함수
        />
        {renderContent}
      </div>
    </div>
  );
}
