import { css } from "@emotion/react";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { theme } from "../../styles/theme";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  redirectTo,
}) => {
  const { isAuthenticated, isLoading } = useAuthStore();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div css={loadingStyles}>
        <div css={spinnerStyles} />
      </div>
    );
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return (
      <Navigate
        to={redirectTo || "/login"}
        state={{ from: location }}
        replace
      />
    );
  }

  // If authentication is not required but user is authenticated (e.g., login/signup pages)
  if (!requireAuth && isAuthenticated) {
    return <Navigate to={redirectTo || "/dashboard"} replace />;
  }

  return <>{children}</>;
};

const loadingStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${theme.colors.gray[50]};
`;

const spinnerStyles = css`
  width: 40px;
  height: 40px;
  border: 4px solid ${theme.colors.gray[200]};
  border-top: 4px solid ${theme.colors.primary[600]};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
