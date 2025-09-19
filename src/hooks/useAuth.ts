import { useMutation } from "@tanstack/react-query";
import type { LoginFormData, SignupFormData } from "../schemas/authSchema";
import type { AuthResponse } from "../services/authService";
import { authService } from "../services/authService";

export const useLoginMutation = () =>
  useMutation<AuthResponse, Error, LoginFormData>({
    mutationFn: authService.login,
  });

export const useRegisterMutation = () =>
  useMutation<AuthResponse, Error, SignupFormData>({
    mutationFn: authService.register,
  });
