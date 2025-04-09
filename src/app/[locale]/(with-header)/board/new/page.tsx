"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

function Editor({ value, onChange }: EditorProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-64 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
      placeholder="내용을 입력하세요..."
    />
  );
}

export default function Page() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const handleSave = async () => {
    // TODO: Save 로직 추가
    console.log("Content to save:", { title, content });
    router.push("/board"); // 저장 후 게시판으로 이동
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200">
        글쓰기
      </h1>

      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="제목을 입력하세요"
        />
      </div>

      <div className="mb-6">
        <Editor value={content} onChange={setContent} />
      </div>

      <div className="flex justify-end space-x-3">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="px-4 py-2"
        >
          취소
        </Button>
        <Button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700"
        >
          저장
        </Button>
      </div>
    </div>
  );
}
