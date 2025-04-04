"use client";

import Inner from "@/components/layout/Inner";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // 현재 경로 감지
import { RefObject } from "react";

const HeaderBottom = () => {
  const pathname = usePathname(); // 현재 URL 가져오기

  return (
    <div className="border-b border-b-slate-200">
      <Inner>
        <div className="flex items-center gap-8 py-2">
          <div className="flex justify-center items-center flex-col text-xs gap-1 cursor-pointer">
            <SearchIcon size={18} />
            검색
          </div>
          <nav className="flex gap-8"></nav>
        </div>
      </Inner>
    </div>
  );
};

export default HeaderBottom;
