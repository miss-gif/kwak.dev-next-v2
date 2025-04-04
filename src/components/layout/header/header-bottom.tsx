"use client";

import Inner from "@/components/layout/Inner";
import { Link, usePathname } from "@/i18n/navigation";
import { SearchIcon } from "lucide-react";
import { useTranslations } from "next-intl";

const HeaderBottom = ({ focusInput }: { focusInput: () => void }) => {
  const pathname = usePathname();

  const t1 = useTranslations("HeaderBottom1");
  const keys1 = ["element1", "element2"] as const;

  return (
    <div className="border-b border-b-slate-200">
      <Inner>
        <div className="flex items-center gap-8 py-2">
          <div
            className="flex justify-center items-center flex-col text-xs gap-1 cursor-pointer"
            onClick={focusInput}
          >
            <SearchIcon size={18} />
            검색
          </div>
          <nav className="flex gap-8">
            {keys1.map((key) => {
              const isActive = pathname === t1(`${key}.href`);

              return (
                <div key={t1(`${key}.label`)} className="">
                  <Link
                    href={t1(`${key}.href`)}
                    className={`text-center text-xs hover:underline  ${
                      isActive ? "font-bold" : "font-normal"
                    }`}
                  >
                    {t1(`${key}.title`)}
                  </Link>
                </div>
              );
            })}
          </nav>
          <Link href={"/test"}>404테스트</Link>
        </div>
      </Inner>
    </div>
  );
};

export default HeaderBottom;
