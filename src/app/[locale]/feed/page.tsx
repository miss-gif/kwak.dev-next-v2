import React from "react";

function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10 p-4 mb-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600 mb-3 md:mb-0">
          추천 피드
        </h1>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0">
            <input
              type="text"
              placeholder="검색..."
              className="w-full md:w-64 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute right-3 top-2.5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition">
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
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </button>
          <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center">
            <span>U</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function RecommendedContent() {
  return (
    <section className="max-w-6xl mx-auto px-4 mb-10">
      <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
        <span className="mr-2">🔥</span> 추천 콘텐츠
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition duration-300"
          >
            <div className="h-48 bg-gray-200 relative">
              <img
                src={`https://source.unsplash.com/random/400x300?sig=${i}`}
                alt="썸네일"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-lg text-gray-800 mb-1">
                흥미로운 콘텐츠 제목
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                이 콘텐츠는 사용자의 관심사에 기반하여 추천되었습니다.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">2시간 전</span>
                <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
                  트렌딩
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PopularPosts() {
  return (
    <section className="max-w-6xl mx-auto px-4 mb-10 bg-gray-50 py-6 rounded-xl">
      <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
        <span className="mr-2">📈</span> 인기 게시물
      </h2>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-lg hover:bg-gray-50 transition"
          >
            <div className="flex justify-between">
              <h3 className="font-medium text-gray-800">
                인기 게시물 제목 #{i}
              </h3>
              <span className="text-sm text-gray-500">3일 전</span>
            </div>
            <p className="mt-1 text-gray-600 text-sm">
              이 글은 많은 사용자들에게 인기가 있습니다.
            </p>
            <div className="mt-3 flex items-center text-sm text-gray-500 gap-3">
              <span className="flex items-center gap-1">❤️ 100</span>
              <span className="flex items-center gap-1">💬 50</span>
              <span className="flex items-center gap-1">👁️ 1.2K</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function LatestNews() {
  return (
    <section className="max-w-6xl mx-auto px-4 mb-10">
      <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
        <span className="mr-2">🔔</span> 최신 소식
      </h2>
      <div className="bg-white rounded-xl shadow-sm p-4">
        <ul className="space-y-4 divide-y divide-gray-100">
          {[1, 2, 3].map((i) => (
            <li key={i} className={i !== 1 ? "pt-4" : ""}>
              <a
                href="#"
                className="block hover:bg-gray-50 rounded-lg p-2 transition"
              >
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-800">
                    최신 업데이트 소식 #{i}
                  </h3>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    NEW
                  </span>
                </div>
                <p className="mt-1 text-gray-600 text-sm">
                  새로운 기능이 추가되었습니다. 지금 확인해보세요!
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CategoryFilter() {
  return (
    <section className="max-w-6xl mx-auto px-4 mb-10">
      <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
        <span className="mr-2">🏷️</span> 카테고리별 콘텐츠
      </h2>
      <div className="flex flex-wrap gap-2">
        {[
          "전체",
          "기술",
          "디자인",
          "비즈니스",
          "생활",
          "취미",
          "교육",
          "여행",
        ].map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium transition 
              ${
                category === "전체"
                  ? "bg-indigo-100 text-indigo-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}

function SocialInteraction() {
  return (
    <section className="max-w-6xl mx-auto px-4 mb-10">
      <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
        <span className="mr-2">💬</span> 소셜 인터랙션
      </h2>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex gap-3">
          <button className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center gap-2 transition">
            <span>👍</span> 좋아요
          </button>
          <button className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center gap-2 transition">
            <span>💬</span> 댓글
          </button>
          <button className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center gap-2 transition">
            <span>🔗</span> 공유
          </button>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <div>
      <Header />
      <RecommendedContent />
      <PopularPosts />
      <LatestNews />
      <CategoryFilter />
      <SocialInteraction />
    </div>
  );
}
