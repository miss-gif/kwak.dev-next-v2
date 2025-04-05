// 일반 회원가입, 로그인

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleRedirect = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        console.log("세션 불러오기 실패:", error);
        router.push("/test");
        return;
      }

      console.log("로그인 완료된 사용자:", data.session.user.email);
      router.push("/dashboard");
    };

    handleRedirect();
  }, [router]);

  return <p>로그인 처리 중입니다...</p>;
}
