// store/authStore.ts
import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  email: string | null;
  login: (email: { id: string; name: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  email: null,
  login: (email) => set({ isLoggedIn: true, email: email.id }),
  logout: () => set({ isLoggedIn: false, email: "" }),
}));
