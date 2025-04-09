"use client";

import { getNotes } from "@/actions/note-actions";
import EmptyNote from "@/app/[locale]/note/components/empty-note";
import Header from "@/app/[locale]/note/components/header";
import NewNote from "@/app/[locale]/note/components/new-note";
import Sidebar from "@/app/[locale]/note/components/sidebar";
import ViewerNote from "@/app/[locale]/note/components/viewer-note";
import BackButton from "@/components/back-button";
import { useNoteStore } from "@/stores/noteStore";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function Page() {
  const { notes, setNotes, activeNoteId, isCreating } = useNoteStore();

  // 검색어를 저장하는 상태
  const [search, setSearch] = useState<string>("");

  // 노트를 가져오는 함수
  const fetchNotes = useCallback(async () => {
    const data = await getNotes(search);
    setNotes(data || []);
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
      return <NewNote fetchNotes={fetchNotes} />;
    }
    if (activeNoteId && activeNote.id !== null) {
      return (
        <ViewerNote
          activeNote={
            activeNote as { id: number; title: string; content: string }
          }
          fetchNotes={fetchNotes}
        />
      );
    }
    return <EmptyNote />;
  }, [isCreating, activeNoteId, activeNote, fetchNotes]);

  return (
    <div className="w-full flex flex-col">
      <BackButton />
      <Header />
      <div className="grow flex">
        <Sidebar
          search={search} // 검색어
          setSearch={setSearch} // 검색어 변경 함수
        />
        {renderContent}
      </div>
    </div>
  );
}
