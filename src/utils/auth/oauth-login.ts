import { signInWithGoogle, signInWithKakao } from "@/utils/supabase/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const handleOAuthLogin = async (
  provider: "google" | "kakao",
  setIsLoading: (loading: boolean) => void
) => {
  const router = useRouter();
  try {
    setIsLoading(true);
    provider === "google" ? await signInWithGoogle() : await signInWithKakao();
    toast.success("로그인 성공!", {
      description: "메인 페이지로 이동합니다.",
    });
    router.push("/");
  } catch (error: any) {
    toast.error("로그인 실패", {
      description: `${
        provider === "google" ? "Google" : "Kakao"
      } 로그인 중 오류가 발생했습니다.`,
    });
  } finally {
    setIsLoading(false);
  }
};
