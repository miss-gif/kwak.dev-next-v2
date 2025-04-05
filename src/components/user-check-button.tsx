"use client";

import { supabase } from "@/utils/supabase/client";

export default function UserCheckButton() {
  const handleClick = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      console.log("로그인되지 않음", error);
    } else {
      console.log("유저 정보:", user);
    }
  };

  return <button onClick={handleClick}>유저 정보 조회</button>;
}
