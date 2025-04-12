import { dummyData } from "@/app/[locale]/(with-header)/board/data";
import PrivateButton from "@/components/private-button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="mb-10">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">게시판</h1>
        <p className="mt-2 text-sm text-gray-600">
          게시판은 사용자가 글을 작성하고 다른 사용자와 소통할 수 있는
          공간입니다.
        </p>
        <div className="flex justify-between items-center mt-6">
          <ul className="flex gap-4 text-sm">
            <li className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
              전체보기
            </li>
            <li className="text-gray-600 hover:text-gray-800 cursor-pointer">
              공지
            </li>
            <li className="text-gray-600 hover:text-gray-800 cursor-pointer">
              일반
            </li>
          </ul>
          <PrivateButton label="글쓰기" url="/board/new" />
        </div>
      </header>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                게시물 번호
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                제목
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                작성자
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                작성일
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                조회수
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                추천수
              </th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                  {item.id}
                </td>
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm font-medium">
                  <Link
                    href={`/board/${item.id}`}
                    className="text-gray-900 hover:text-blue-600"
                  >
                    {item.title}
                    {item.comments > 0 && (
                      <span className="mx-1 text-xs text-blue-600 font-bold">
                        [{item.comments}]
                      </span>
                    )}
                  </Link>
                </td>
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                  {item.author}
                </td>
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-gray-600">
                  {item.date}
                </td>
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-gray-600">
                  {item.views}
                </td>
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-gray-600">
                  {item.likes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex justify-center">
        <nav className="flex items-center gap-1">
          <button className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100">
            이전
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`px-3 py-1 rounded ${page === 1 ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}
            >
              {page}
            </button>
          ))}
          <button className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100">
            다음
          </button>
        </nav>
      </div>
    </div>
  );
}
