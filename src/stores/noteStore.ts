import { create } from "zustand";

type Note = {
  id: number | null;
  title: string;
  content: string;
};

type NoteStore = {
  notes: Note[];
  activeNoteId: number | null;
  isCreating: boolean;
  setNotes: (notes: Note[]) => void;
  setActiveNoteId: (id: number | null) => void;
  setIsCreating: (state: boolean) => void;
};

export const useNoteStore = create<NoteStore>((set) => ({
  notes: [], // 노트 목록
  activeNoteId: null, // 활성화된 노트의 ID
  isCreating: false, // 새로운 노트를 생성 중인지 여부
  setNotes: (notes) => set({ notes }), // 노트 목록을 설정하는 함수
  setActiveNoteId: (id) => set({ activeNoteId: id }), // 활성화된 노트 ID를 설정하는 함수
  setIsCreating: (state) => set({ isCreating: state }), // 새로운 노트를 생성 중인지 여부를 설정하는 함수
}));
