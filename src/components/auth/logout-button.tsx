import { Button } from "@/components/ui/button";
import { signOut } from "@/utils/supabase/actions";
import { useRouter } from "next/navigation";
import React from "react";

const LogoutButton = () => {
  const router = useRouter();

  const fetchSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return <Button onClick={fetchSignOut}>로그아웃</Button>;
};

export default LogoutButton;
