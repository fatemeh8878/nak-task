import { css } from "@emotion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui";
import { ControlledInput } from "../components/ui/ControlledInput";
import { useLoginMutation } from "../hooks/useAuth";
import { loginSchema, type LoginFormData } from "../schemas/authSchema";
import { useAuthStore } from "../stores/authStore";
import { theme } from "../styles/theme";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { mutate, isPending, error } = useLoginMutation();
  const { setAuth } = useAuthStore();
  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    values: {
      userName: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data, {
      onSuccess: (response) => {
        setAuth(response.access_token, data.userName);
        navigate("/dashboard");
      },
    });
  });

  const containerStyles = css`
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(
      135deg,
      ${theme.colors.primary[50]} 0%,
      ${theme.colors.gray[50]} 100%
    );
  `;

  const cardStyles = css`
    width: 40%;
    padding: 40px;
    border-radius: 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    background: white;
  `;

  const titleStyles = css`
    font-size: 30px;
    font-weight: 800;
    margin-bottom: 40px;
    color: #000000;
  `;

  const formStyles = css`
    display: flex;
    flex-direction: column;
    gap: 24px;
  `;

  const inputContainerStyles = css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.lg};
  `;

  const buttonContainerStyles = css`
    display: flex;
    gap: 24px;
    margin-top: ${theme.spacing.lg};
    justify-content: space-between;
  `;

  const errorStyles = css`
    color: ${theme.colors.error[500]};
    font-size: 14px;
    margin-top: 8px;
    text-align: center;
  `;

  const arrowIconStyles = css`
    width: 16px;
    height: 16px;
    fill: currentColor;
  `;

  return (
    <div css={containerStyles}>
      <div css={cardStyles}>
        <h1 css={titleStyles}>Sign In</h1>

        <form css={formStyles} onSubmit={onSubmit}>
          <div css={inputContainerStyles}>
            <ControlledInput
              label="Username"
              name="userName"
              control={control}
              fullWidth
            />
            <ControlledInput
              label="Password"
              name="password"
              control={control}
              fullWidth
            />
          </div>

          {error && (
            <div css={errorStyles}>
              {error instanceof Error
                ? error.message
                : "Login failed. Please try again."}
            </div>
          )}

          <div css={buttonContainerStyles}>
            <Button
              type="button"
              variant="white"
              size="sm"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
            <Button
              type="submit"
              variant="black"
              size="sm"
              disabled={isPending}
              style={{
                cursor: isPending ? "not-allowed" : "pointer",
                width: "116px",
              }}
            >
              <svg css={arrowIconStyles} viewBox="0 0 24 24">
                <path
                  d="M5 12h14m-7-7l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
