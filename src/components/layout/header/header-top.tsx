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
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type RefObject,
} from "react";

interface HeaderTopProps {
  inputRef: RefObject<HTMLInputElement | null>;
}

const HeaderTop = ({ inputRef }: HeaderTopProps) => {
  const t1 = useTranslations("HeaderTop1");
  const keys1 = ["element1", "element2"] as const;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const supabase = useMemo(() => createClient(), []);

  const handleAuthStateChange = useCallback(
    (event: string) => {
      if (event === "SIGNED_IN") {
        setIsLoggedIn(true);
      } else if (event === "SIGNED_OUT") {
        setIsLoggedIn(false);
      }
    },
    [setIsLoggedIn]
  );

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error && data?.user) {
        setIsLoggedIn(true);
        setEmail(data.user.email || "");
      }
    };

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // console.log("Auth event:", event); // 디버깅용
        // console.log("Session:", session); // 디버깅용
        handleAuthStateChange(event);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase, handleAuthStateChange]);

  const PcHeader = () => (
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
          <LoginPopover email={email} setIsLoggedIn={setIsLoggedIn} />
        )}
      </div>
    </div>
  );

  return (
    <header>
      <Inner>
        <PcHeader />
        <MoHeaderTop
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          data={{ email }}
          inputRef={inputRef}
        />
      </Inner>
    </header>
  );
};

export default HeaderTop;
