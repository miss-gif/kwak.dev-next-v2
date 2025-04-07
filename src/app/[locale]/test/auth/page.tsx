"use client";

import SignIn from "@/app/[locale]/test/auth/SignIn";
import SignUp from "@/app/[locale]/test/auth/SignUp";
import UserCheckButton from "@/components/auth/user-check-button";
import Inner from "@/components/layout/Inner";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default function Page() {
  return (
    <div>
      <div className="p-5 bg-green-600 text-white w-full text-center">
        회원가입/로그인 테스트 페이지입니다.
      </div>

      <Inner>
        <header className="flex gap-2 py-4">
          {/* <LogoutButton /> */}
          <UserCheckButton />
          <Button asChild>
            <Link href={"/auth/callback"}>리디렉션</Link>
          </Button>
        </header>

        <div className="grid grid-cols-2 gap-4 p-4">
          <SignUp />
          <SignIn />
        </div>
      </Inner>
    </div>
  );
}
