import { css } from "@emotion/react";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Input } from "../components/ui";
import type { SignupCredentials } from "../features/auth/types/auth.types";
import { useAuthStore } from "../stores/authStore";
import { theme } from "../styles/theme";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { signup, isLoading, error, clearError } = useAuthStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupCredentials>();

  const password = watch("password");

  const onSubmit = async (data: SignupCredentials) => {
    try {
      clearError();
      await signup(data);
      navigate("/dashboard");
    } catch {
      // Error is handled by the store
    }
  };

  const containerStyles = css`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(
      135deg,
      ${theme.colors.primary[50]} 0%,
      ${theme.colors.gray[50]} 100%
    );
    padding: ${theme.spacing.lg};
  `;

  const cardStyles = css`
    width: 100%;
    max-width: 450px;
  `;

  const headerStyles = css`
    text-align: center;
    margin-bottom: ${theme.spacing["2xl"]};
  `;

  const titleStyles = css`
    font-size: ${theme.typography.fontSize["3xl"]};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.gray[900]};
    margin: 0 0 ${theme.spacing.sm} 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${theme.spacing.md};
  `;

  const subtitleStyles = css`
    font-size: ${theme.typography.fontSize.lg};
    color: ${theme.colors.gray[600]};
    margin: 0;
  `;

  const formStyles = css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.lg};
  `;

  const errorAlertStyles = css`
    padding: ${theme.spacing.md};
    background-color: ${theme.colors.error[50]};
    border: 1px solid ${theme.colors.error[200]};
    border-radius: ${theme.borderRadius.md};
    color: ${theme.colors.error[700]};
    font-size: ${theme.typography.fontSize.sm};
  `;

  const footerStyles = css`
    text-align: center;
    margin-top: ${theme.spacing.xl};
    padding-top: ${theme.spacing.xl};
    border-top: 1px solid ${theme.colors.gray[200]};
  `;

  const footerTextStyles = css`
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.gray[600]};
    margin: 0;
  `;

  const linkStyles = css`
    color: ${theme.colors.primary[600]};
    text-decoration: none;
    font-weight: ${theme.typography.fontWeight.medium};

    &:hover {
      color: ${theme.colors.primary[700]};
      text-decoration: underline;
    }
  `;

  return (
    <div css={containerStyles}>
      <Card css={cardStyles} padding="lg" shadow="xl">
        <div css={headerStyles}>
          <h1 css={titleStyles}>📝 Create Account</h1>
          <p css={subtitleStyles}>Sign up for your admin account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} css={formStyles}>
          {error && <div css={errorAlertStyles}>{error}</div>}

          <Input
            type="text"
            label="Full Name"
            placeholder="Enter your full name"
            leftIcon="👤"
            error={errors.name?.message}
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
          />

          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            leftIcon="📧"
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />

          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            leftIcon="🔒"
            error={errors.password?.message}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />

          <Input
            type="password"
            label="Confirm Password"
            placeholder="Confirm your password"
            leftIcon="🔒"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <div css={footerStyles}>
          <p css={footerTextStyles}>
            Already have an account?{" "}
            <Link to="/login" css={linkStyles}>
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Signup;
