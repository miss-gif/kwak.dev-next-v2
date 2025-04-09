import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  email: string;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setEmail: (email: string) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  email: "",
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  setEmail: (email) => set({ email }),
}));

export default useAuthStore;
