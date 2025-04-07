import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface SocialLoginButtonsProps {
  isLoading: boolean;
  handleOAuthLogin: (provider: "google" | "kakao") => Promise<void>;
}

export const SocialLoginButtons = ({
  isLoading,
  handleOAuthLogin,
}: SocialLoginButtonsProps) => {
  const b1 = useTranslations("kakaoButton");
  const b2 = useTranslations("googleButton");

  return (
    <div className="text-center">
      <div className="flex flex-col space-y-3 w-full">
        <Button
          variant="outline"
          onClick={() => handleOAuthLogin("kakao")}
          disabled={isLoading}
        >
          {b1("login")}
        </Button>
        <Button
          variant="outline"
          onClick={() => handleOAuthLogin("google")}
          disabled={isLoading}
        >
          {b2("login")}
        </Button>
      </div>
    </div>
  );
};
