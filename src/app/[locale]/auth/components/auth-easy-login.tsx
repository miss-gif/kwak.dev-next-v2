import { SocialLoginButtons } from "@/components/auth/social-login-buttons";
import { handleOAuthLogin } from "@/utils/auth/oauth-login";

type AuthEasyLoginProps = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  text?: string;
};

const AuthEasyLogin = ({
  isLoading,
  setIsLoading,
  text,
}: AuthEasyLoginProps) => {
  return (
    <div>
      <div className="flex items-center my-4">
        <div className="flex-grow h-px bg-gray-200"></div>
        <span className="mx-4 text-sm text-gray-400">{text}</span>
        <div className="flex-grow h-px bg-gray-200"></div>
      </div>
      <SocialLoginButtons
        isLoading={isLoading}
        handleOAuthLogin={(provider) =>
          handleOAuthLogin(provider, setIsLoading)
        }
      />
    </div>
  );
};

export default AuthEasyLogin;
