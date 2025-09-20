export class AppError extends Error {
  public readonly code?: string;
  public readonly status?: number;
  public readonly details?: Record<string, unknown>;

  constructor(
    message: string,
    code?: string,
    status?: number,
    details?: Record<string, unknown>
  ) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

export const handleApiError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  // Handle axios errors
  if (error && typeof error === "object" && "response" in error) {
    const axiosError = error as any;
    const status = axiosError.response?.status;
    const message =
      axiosError.response?.data?.message ||
      axiosError.message ||
      "An error occurred";
    const details = axiosError.response?.data?.details;

    return new AppError(message, undefined, status, details);
  }

  // Handle network errors
  if (error && typeof error === "object" && "message" in error) {
    const networkError = error as Error;
    return new AppError(networkError.message, "NETWORK_ERROR");
  }

  // Fallback
  return new AppError("An unexpected error occurred", "UNKNOWN_ERROR");
};

export const isApiError = (error: unknown): error is AppError => {
  return error instanceof AppError;
};

export const getErrorMessage = (error: unknown): string => {
  const appError = handleApiError(error);
  return appError.message;
};

