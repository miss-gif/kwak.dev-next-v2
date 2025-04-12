"use client";

import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

function SignIn() {
  const [email, setEmail] = useState("svx327@naver.com");
  const [password, setPassword] = useState("svx327@naver.com");
  const [message, setMessage] = useState("");

  const handleSignIn = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(`로그인 실패: ${error.message}`);
    } else {
      setMessage(`로그인 성공! 환영합니다 ${data.user?.email}`);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">로그인</h2>
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
        onClick={handleSignIn}
        className="bg-green-500 text-white px-4 py-2"
      >
        로그인
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default SignIn;
