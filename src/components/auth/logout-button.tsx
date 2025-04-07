import { Button } from "@/components/ui/button";
import { signOut } from "@/utils/supabase/actions";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

const LogoutButton = ({ setIsLoggedIn }: Props) => {
  const router = useRouter();

  const fetchSignOut = async () => {
    await signOut();
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <Button
      className="w-full bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 transition-colors duration-200"
      onClick={fetchSignOut}
    >
      로그아웃
    </Button>
  );
};

export default LogoutButton;
