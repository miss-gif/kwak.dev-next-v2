// hooks/useAuthListener.ts
import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import useAuthStore from "@/stores/authStore";

export const useAuthListener = () => {
  const { setIsLoggedIn, setEmail } = useAuthStore();
  const supabase = createClient();

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setIsLoggedIn(true);
        setEmail(data.user.email || "");
      }
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        setIsLoggedIn(true);
      } else if (event === "SIGNED_OUT") {
        setIsLoggedIn(false);
        setEmail("");
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [setIsLoggedIn, setEmail]);
};
