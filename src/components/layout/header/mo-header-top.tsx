import { LanguageDialog } from "@/components/language-dialog";
import { SheetSide } from "@/components/layout/header/mo-sidebar";
import { LoginAlertDialog } from "@/components/login-alert-dialog";
import LoginPopover from "@/components/login-popover";
import { Link } from "@/i18n/navigation";
import useAuthStore from "@/stores/authStore";
import React from "react";

type Props = {
  inputRef: React.RefObject<HTMLInputElement | null>;
};

const MoHeaderTop = ({ inputRef }: Props) => {
  const { isLoggedIn, email } = useAuthStore();

  return (
    <div className="flex items-center justify-between gap-4 relative md:hidden">
      <div className="block md:hidden">
        <SheetSide inputRef={inputRef} />
      </div>

      <h1 className="text-xl font-bold absolute left-1/2 -translate-x-1/2">
        <Link href="/">Kwak.dev</Link>
      </h1>

      <div className="flex items-center gap-2">
        <LanguageDialog />
        {!isLoggedIn ? <LoginAlertDialog /> : <LoginPopover />}
      </div>
    </div>
  );
};

export default MoHeaderTop;
