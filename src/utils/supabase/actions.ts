"use server";

import { Provider } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { createClient } from "./server";

// 특정 OAuth 제공자를 사용하여 로그인하는 함수
const signInWith = (provider: Provider) => async () => {
  const supabase = await createClient();

  // 인증 콜백 URL 설정
  const auth_callback_url = `${process.env.SITE_URL}/auth/callback`;

  // OAuth를 사용하여 로그인 시도
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: auth_callback_url,
    },
  });

  console.log(data);

  // 에러 발생 시 로그 출력
  if (error) {
    console.log(error);
  }

  // 로그인 성공 시 리다이렉트
  redirect(data.url as string);
};

// 구글로 로그인
const signInWithGoogle = signInWith("google");
// 카카오로 로그인
const signInWithKakao = signInWith("kakao");

// 로그아웃 함수
const signOut = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
};

// 외부에서 활용할 수 있도록 함수들 내보내기
export { signInWithGoogle, signInWithKakao, signOut };
