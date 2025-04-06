"use client";

import { supabase } from "@/utils/supabase/client";
import { useState } from "react";

function SignUp() {
  const [email, setEmail] = useState("svx327@naver.com");
  const [password, setPassword] = useState("svx327@naver.com");
  const [message, setMessage] = useState("");

  const auth_callback_url = `${process.env.SITE_URL}/auth/callback`;

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: auth_callback_url,
      },
    });

    console.log(data);

    if (error) {
      setMessage(`회원가입 실패: ${error.message}`);
    } else {
      setMessage("회원가입 성공! 이메일 인증을 확인하세요.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">회원가입</h2>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full"
      />
      <button
        onClick={handleSignUp}
        className="bg-blue-500 text-white px-4 py-2"
      >
        가입하기
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default SignUp;
