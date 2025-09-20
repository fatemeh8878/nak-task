import { useMutation } from "@tanstack/react-query";
import { authEndpoints } from "../endpoints/auth";
import type { AuthResponse } from "../types";
import type { LoginFormData, SignupFormData } from "../../schemas/authSchema";

export const useLoginMutation = () =>
  useMutation<AuthResponse, Error, LoginFormData>({
    mutationFn: authEndpoints.login,
  });

export const useRegisterMutation = () =>
  useMutation<AuthResponse, Error, SignupFormData>({
    mutationFn: authEndpoints.register,
  });

