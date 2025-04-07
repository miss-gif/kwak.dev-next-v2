import { LanguageDialog } from "@/components/language-dialog";
import { SheetSide } from "@/components/layout/header/mo-sidebar";
import { LoginAlertDialog } from "@/components/login-alert-dialog";
import LoginPopover from "@/components/login-popover";
import { Link } from "@/i18n/navigation";
import React from "react";

type Props = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  data: { email: string };
  inputRef: React.RefObject<HTMLInputElement | null>;
};

const MoHeaderTop = ({ isLoggedIn, setIsLoggedIn, data, inputRef }: Props) => {
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
        {!isLoggedIn ? (
          <LoginAlertDialog />
        ) : (
          <LoginPopover email={data.email} setIsLoggedIn={setIsLoggedIn} />
        )}
      </div>
    </div>
  );
};

export default MoHeaderTop;
