import Inner from "@/components/layout/Inner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <header className="w-full p-5 flex items-center bg-gray-200">
        i18n의 번역데이터 관리페이지입니다. (기능개발 중)
      </header>
      <nav>
        <ul className="flex gap-4 p-5 bg-gray-100">
          <li>
            <a href="/admin/">홈</a>
          </li>
        </ul>
      </nav>
      <Inner>
        <div>{children}</div>
      </Inner>
    </section>
  );
}
