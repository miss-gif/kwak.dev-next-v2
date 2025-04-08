"use client";

import AuthEasyLogin from "@/app/[locale]/auth/components/auth-easy-login";
import AuthFooter from "@/app/[locale]/auth/components/auth-footer";
import { AuthHeader } from "@/app/[locale]/auth/components/auth-header";
import SignupForm from "@/components/auth/signup-form";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);

  const t2 = useTranslations("HeaderTop2");
  const t4 = useTranslations("HeaderTop4");
  const easySignup = t4("easySignup");
  const keys3 = ["element3"] as const;
  const yesUser = t4("yesUser");

  return (
    <>
      <AuthHeader
        title="Kwak.dev"
        description="회원가입하고 더 많은 기능을 이용하세요."
      />
      <SignupForm />
      <AuthEasyLogin text={easySignup} />
      <AuthFooter text={yesUser} el={keys3} link={t2} />
    </>
  );
}
