"use client";

import { Button } from "@/components/ui/button";
import { signInWithGoogle, signInWithKakao } from "@/utils/supabase/actions";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

export const SocialLoginButtons = () => {
  const [isLoading, setIsLoading] = useState(false);

  const b1 = useTranslations("kakaoButton");
  const b2 = useTranslations("googleButton");

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
      toast.success("로그인 성공!", {
        description: "메인 페이지로 이동합니다.",
      });
    } catch (error) {
      toast.error("로그인 실패", {
        description: "Google 로그인 중 오류가 발생했습니다.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKakaoLogin = async () => {
    try {
      setIsLoading(true);
      await signInWithKakao();
      toast.success("로그인 성공!", {
        description: "메인 페이지로 이동합니다.",
      });
    } catch (error) {
      toast.error("로그인 실패", {
        description: "Google 로그인 중 오류가 발생했습니다.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center">
      <div className="flex flex-col space-y-3 w-full">
        <Button
          variant="outline"
          onClick={handleKakaoLogin}
          disabled={isLoading}
        >
          {b1("login")}
        </Button>
        <Button
          variant="outline"
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          {b2("login")}
        </Button>
      </div>
    </div>
  );
};
