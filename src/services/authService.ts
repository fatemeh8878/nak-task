import type { LoginFormData, SignupFormData } from "../schemas/authSchema";
import { api } from "./api";

// Auth API types
export interface AuthResponse {
  access_token: string;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email?: string;
}

// Auth service functions
export const authService = {
  // Login user
  login: async (credentials: LoginFormData): Promise<AuthResponse> => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  // Register user
  register: async (userData: SignupFormData): Promise<AuthResponse> => {
    const response = await api.post("/users/register", userData);
    return response.data;
  },

  // Get user profile
  getProfile: async (): Promise<UserProfile> => {
    const response = await api.get("/auth/profile");
    return response.data;
  },

  // Logout user
  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },

  // Refresh token
  refreshToken: async (): Promise<{ token: string }> => {
    const response = await api.post("/auth/refresh");
    return response.data;
  },
};
