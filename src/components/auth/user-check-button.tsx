"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

export default function UserCheckButton() {
  const supabase = createClient();
  const handleClick = async () => {
    const { data, error } = await supabase.auth.getUser();

    if (error || !data) {
      alert("로그인되지 않음");
      console.log("로그인되지 않음", error);
    } else {
      alert("로그인됨");
      console.log("유저 정보:", data);
    }
  };

  return <Button onClick={handleClick}>data 조회</Button>;
}
