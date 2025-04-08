"use client";

import AuthEasyLogin from "@/app/[locale]/auth/components/auth-easy-login";
import AuthFooter from "@/app/[locale]/auth/components/auth-footer";
import { AuthHeader } from "@/app/[locale]/auth/components/auth-header";
import AuthUserFind from "@/app/[locale]/auth/components/auth-user-find";
import LoginForm from "@/components/auth/login-form";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);

  const t2 = useTranslations("HeaderTop2");
  const t4 = useTranslations("HeaderTop4");
  const keys1 = ["element1"] as const;
  const easyLogin = t4("easyLogin");
  const noUser = t4("noUser");

  return (
    <>
      <AuthHeader
        title="Kwak.dev"
        description="계정에 로그인하고 더 많은 기능을 이용해보세요."
      />
      <LoginForm />
      <AuthUserFind />
      <AuthEasyLogin text={easyLogin} />
      <AuthFooter text={noUser} el={keys1} link={t2} />
    </>
  );
}
