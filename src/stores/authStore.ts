import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  LoginCredentials,
  SignupCredentials,
  User,
} from "../features/auth/types/auth.types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  checkAuth: () => Promise<void>;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });

        // Simple mock login - accept any credentials
        const user: User = {
          id: "1",
          email: credentials.email,
          name: credentials.email.split("@")[0] || "User",
          role: "admin",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      },

      signup: async (credentials: SignupCredentials) => {
        set({ isLoading: true, error: null });

        // Simple mock signup - accept any credentials
        const user: User = {
          id: Date.now().toString(),
          email: credentials.email,
          name: credentials.name,
          role: "user",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      clearError: () => {
        set({ error: null });
      },

      checkAuth: async () => {
        set({ isLoading: true });

        // Simple mock - check if user exists in state
        const currentUser = get().user;
        set({
          isAuthenticated: !!currentUser,
          isLoading: false,
        });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
