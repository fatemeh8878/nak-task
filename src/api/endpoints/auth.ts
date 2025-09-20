import type { LoginFormData, SignupFormData } from "../../schemas/authSchema";
import { apiClient } from "../client";
import type { AuthResponse, UserProfile } from "../types";

export const authEndpoints = {
  // Login user
  login: async (credentials: LoginFormData): Promise<AuthResponse> => {
    const response = await apiClient.post("/auth/login", credentials);
    return response.data;
  },

  // Register user
  register: async (userData: SignupFormData): Promise<AuthResponse> => {
    const response = await apiClient.post("/users/register", userData);
    return response.data;
  },

  // Get user profile
  getProfile: async (): Promise<UserProfile> => {
    const response = await apiClient.get("/auth/profile");
    return response.data;
  },

  // Logout user
  logout: async (): Promise<void> => {
    await apiClient.post("/auth/logout");
  },

  // Refresh token
  refreshToken: async (): Promise<{ token: string }> => {
    const response = await apiClient.post("/auth/refresh");
    return response.data;
  },
};

