import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  // State
  isAuthenticated: boolean;
  token: string | null;
  user: string | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setAuth: (token: string, user: string | null) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial state
      isAuthenticated: false,
      token: null,
      user: null,
      isLoading: false,
      error: null,

      // Actions
      setAuth: (token: string, user: string | null) => {
        set({
          isAuthenticated: true,
          token,
          user,
          error: null,
        });
      },

      clearAuth: () => {
        set({
          isAuthenticated: false,
          token: null,
          user: null,
          error: null,
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      logout: () => {
        set({
          isAuthenticated: false,
          token: null,
          user: null,
          error: null,
        });
      },
    }),
    {
      name: "auth-storage", // unique name for localStorage key
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        user: state.user,
      }),
    }
  )
);
