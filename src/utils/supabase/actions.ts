"use server";

import { Provider } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { createClient } from "./server";

const signInWith = (provider: Provider) => async () => {
  const supabase = await createClient();

  const auth_callback_url = `${process.env.SITE_URL}/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: auth_callback_url,
    },
  });

  console.log(data);

  if (error) {
    console.log(error);
  }

  redirect(data.url as string);
};

// 구글
const signInWithGoogle = signInWith("google");
// 카카오
const signInWithKakao = signInWith("kakao");

const signOut = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
};

// 외부 활용
export { signInWithGoogle, signInWithKakao, signOut };
