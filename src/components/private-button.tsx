"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import useAuthStore from "@/stores/authStore";
import { toast } from "sonner";

type PrivateButtonProps = {
  label: string;
  url: string;
};

const PrivateButton = ({ label, url }: PrivateButtonProps) => {
  const { isLoggedIn, email } = useAuthStore();
  const route = useRouter();

  const handleClick = () => {
    if (!isLoggedIn || !email) {
      toast("권한이 필요합니다.", {
        description: "로그인 후 시도해주세요.",
        action: {
          label: "로그인 하기",
          onClick: () => route.push("/auth/login"),
        },
      });
      return;
    }
    route.push(url);
  };

  return <Button onClick={handleClick}>{label}</Button>;
};

export default PrivateButton;
