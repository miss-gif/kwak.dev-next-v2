import { SocialLoginButtons } from "@/components/auth/social-login-buttons";

type AuthEasyLoginProps = {
  text: string;
};

const AuthEasyLogin = ({ text }: AuthEasyLoginProps) => {
  return (
    <div>
      <div className="flex items-center my-4">
        <div className="flex-grow h-px bg-gray-200"></div>
        <span className="mx-4 text-sm text-gray-400">{text}</span>
        <div className="flex-grow h-px bg-gray-200"></div>
      </div>
      <SocialLoginButtons />
    </div>
  );
};

export default AuthEasyLogin;
