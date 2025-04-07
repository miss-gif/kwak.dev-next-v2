"use client";

import { LanguageDialog } from "@/components/language-dialog";
import Inner from "@/components/layout/Inner";
import { LoginAlertDialog } from "@/components/login-alert-dialog";
import LoginPopover from "@/components/login-popover";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { createClient } from "@/utils/supabase/client";
import { SearchIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

interface HeaderTopProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const HeaderTop = ({ inputRef }: HeaderTopProps) => {
  const t1 = useTranslations("HeaderTop1");
  const keys1 = ["element1", "element2"] as const;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const supabase = useMemo(() => createClient(), []);
  const [data, setData] = useState({ email: "" });

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (!error && data?.user) {
        setIsLoggedIn(true);
        setData({ email: data.user.email || "" });
      }
    });
  }, []);

  return (
    <header>
      <Inner>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full">
            <h1 className="text-xl font-bold">
              <Link href="/">Kwak.dev</Link>
            </h1>

            <div className="flex gap-2">
              {keys1.map((key) => (
                <div key={key} className="font-semibold">
                  <Link href={t1(`${key}.href`)}>{t1(`${key}.title`)}</Link>
                </div>
              ))}
            </div>

            <div className="flex-1 relative flex items-center justify-end">
              <Input
                ref={inputRef}
                className="w-full pr-10"
                placeholder="현재 기능 점검 중입니다."
              />
              <SearchIcon
                size={20}
                className="absolute right-3 text-muted-foreground"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <LanguageDialog />
            {!isLoggedIn ? (
              <LoginAlertDialog />
            ) : (
              <LoginPopover email={data.email} setIsLoggedIn={setIsLoggedIn} />
            )}
          </div>
        </div>
      </Inner>
    </header>
  );
};

export default HeaderTop;
