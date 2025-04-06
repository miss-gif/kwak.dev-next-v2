"use client";

import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/client";

export default function UserCheckButton() {
  const handleClick = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      alert("로그인되지 않음");
      console.log("로그인되지 않음", error);
    } else {
      alert("로그인됨");
      console.log("유저 정보:", user);
    }
  };

  return <Button onClick={handleClick}>user 조회</Button>;
}
