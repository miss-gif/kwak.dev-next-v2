"use client";

import { LanguageDialog } from "@/components/language-dialog";
import HeaderSearchbar from "@/components/layout/header/header-searchbar";
import MoHeaderTop from "@/components/layout/header/mo-header-top";
import Inner from "@/components/layout/Inner";
import { LoginAlertDialog } from "@/components/login-alert-dialog";
import LoginPopover from "@/components/login-popover";
import { Link } from "@/i18n/navigation";
import { createClient } from "@/utils/supabase/client";
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

  const PcHeader = () => {
    return (
      <div className="hidden md:flex items-center justify-between gap-4">
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

          <HeaderSearchbar inputRef={inputRef} />
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
    );
  };

  return (
    <header>
      <Inner>
        <PcHeader />
        <MoHeaderTop
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          data={data}
          inputRef={inputRef}
        />
      </Inner>
    </header>
  );
};

export default HeaderTop;
