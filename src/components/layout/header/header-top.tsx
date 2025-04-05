"use client";

import { LanguageDialog } from "@/components/language-dialog";
import Inner from "@/components/layout/Inner";
import { LoginAlertDialog } from "@/components/login-alert-dialog";
import LogoutButton from "@/components/logout-button";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { SearchIcon } from "lucide-react";
import { useTranslations } from "next-intl";

interface HeaderTopProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const HeaderTop = ({ inputRef }: HeaderTopProps) => {
  const t1 = useTranslations("HeaderTop1");
  const keys1 = ["element1", "element2"] as const;

  return (
    <header>
      <Inner>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full">
            <h1 className="text-xl font-bold">
              <Link href={"/"}>Kwak.dev</Link>
            </h1>

            <div className="flex gap-2">
              {keys1.map((key) => (
                <div key={t1(`${key}.label`)} className="font-semibold">
                  <Link href={t1(`${key}.href`)}>{t1(`${key}.title`)}</Link>
                </div>
              ))}
            </div>

            <div className="flex-1 relative flex items-center justify-end">
              <Input
                ref={inputRef}
                className="w-full"
                placeholder="현재 기능 점검 중입니다."
              />
              <SearchIcon size={20} className="absolute mx-3" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageDialog />
            <LoginAlertDialog />
          </div>

          <LogoutButton />
        </div>
      </Inner>
    </header>
  );
};

export default HeaderTop;
