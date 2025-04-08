"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";

interface BoardItem {
  id: number;
  title: string;
  author: string;
  date: string;
  views: number;
  comments: number;
  likes: number;
  content?: string; // Added content field for the post details
}

const Controller = () => {
  return (
    <div className="mt-6 flex justify-between items-center">
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          수정
        </button>
        <button className="px-4 py-2 bg-red-200 rounded hover:bg-red-300">
          삭제
        </button>
      </div>
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          이전 글
        </button>
        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          다음 글
        </button>
        <Link
          href={"/board"}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          목록으로
        </Link>
      </div>
    </div>
  );
};

export default function Page() {
  const params = useParams();
  const postId = params.postId as string;
  const [post, setPost] = useState<BoardItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This is a placeholder. In a real app, you'd fetch from an API
    const fetchPost = async () => {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Mock data for demonstration
        const mockPost: BoardItem = {
          id: parseInt(postId, 10),
          title: `게시글 제목 ${postId}`,
          author: "작성자",
          date: new Date().toISOString(),
          views: 123,
          comments: 5,
          likes: 10,
          content:
            "이 게시글의 상세 내용입니다. 여기에 게시글의 전체 내용이 표시됩니다.",
        };

        setPost(mockPost);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  if (loading) {
    return <div className="p-8 text-center">로딩 중...</div>;
  }

  if (!post) {
    return <div className="p-8 text-center">게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Controller />
      <article className="bg-white rounded-lg shadow-md p-6">
        <header className="border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
          <div className="flex justify-between text-gray-600 text-sm">
            <div className="flex items-center space-x-4">
              <span>작성자: {post.author}</span>
              <span>작성일: {format(new Date(post.date), "yyyy.MM.dd")}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>조회 {post.views}</span>
              <span>댓글 {post.comments}</span>
              <span>좋아요 {post.likes}</span>
            </div>
          </div>
        </header>

        <div className="prose max-w-none">
          <p>{post.content}</p>
        </div>

        <div className="mt-8 flex justify-center">
          <button className="flex items-center space-x-1 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>좋아요 {post.likes}</span>
          </button>
        </div>

        <div className="mt-10 pt-6 border-t">
          <h3 className="text-lg font-bold mb-4">댓글 {post.comments}개</h3>
          {/* Comments section could be added here */}
        </div>
      </article>

      <Controller />
    </div>
  );
}
