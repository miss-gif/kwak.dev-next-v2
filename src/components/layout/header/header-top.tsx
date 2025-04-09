"use client";

import { LanguageDialog } from "@/components/language-dialog";
import HeaderSearchbar from "@/components/layout/header/header-searchbar";
import { useAuthListener } from "@/components/layout/header/hooks/useAuthListener";
import MoHeaderTop from "@/components/layout/header/mo-header-top";
import Inner from "@/components/layout/Inner";
import { LoginAlertDialog } from "@/components/login-alert-dialog";
import LoginPopover from "@/components/login-popover";
import { Link } from "@/i18n/navigation";
import useAuthStore from "@/stores/authStore";
import { useTranslations } from "next-intl";
import type { RefObject } from "react";

interface HeaderTopProps {
  inputRef: RefObject<HTMLInputElement | null>;
}

const HeaderTop = ({ inputRef }: HeaderTopProps) => {
  const t = useTranslations("HeaderTop1");

  const navItems = [
    { href: t("element1.href"), title: t("element1.title") },
    { href: t("element2.href"), title: t("element2.title") },
  ];

  useAuthListener(); // 커스텀 훅으로 인증 상태 관리

  return (
    <header>
      <Inner>
        <PcHeader navItems={navItems} inputRef={inputRef} />
        <MoHeaderTop inputRef={inputRef} />
      </Inner>
    </header>
  );
};

interface PcHeaderProps {
  navItems: { href: string; title: string }[];
  inputRef: RefObject<HTMLInputElement | null>;
}

const PcHeader = ({ navItems, inputRef }: PcHeaderProps) => {
  const { isLoggedIn } = useAuthStore();

  return (
    <div className="hidden md:flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 w-full">
        <h1 className="text-xl font-bold">
          <Link href="/">Kwak.dev</Link>
        </h1>

        <nav className="flex gap-2">
          {navItems.map(({ href, title }) => (
            <div key={href} className="font-semibold">
              <Link href={href}>{title}</Link>
            </div>
          ))}
        </nav>

        <HeaderSearchbar inputRef={inputRef} />
      </div>

      <div className="flex items-center gap-2">
        <LanguageDialog />
        {isLoggedIn ? <LoginPopover /> : <LoginAlertDialog />}
      </div>
    </div>
  );
};

export default HeaderTop;
