"use client";

import LogoutButton from "@/components/logout-button";
import { Button } from "@/components/ui/button";
import UserCheckButton from "@/components/user-check-button";
import { Link } from "@/i18n/navigation";
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

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignIn = async () => {
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

export default function Page() {
  return (
    <div>
      <header>
        <LogoutButton />
        <UserCheckButton />
        <Button asChild>
          <Link href={"/auth/callback"}>리디렉션</Link>
        </Button>
      </header>
      <div className="grid grid-cols-2 gap-4 p-4">
        <div>
          <SignUp />
        </div>
        <div>
          <SignIn />
        </div>
      </div>
    </div>
  );
}
