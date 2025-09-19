import { css } from "@emotion/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Input } from "../components/ui";
import type { LoginCredentials } from "../features/auth/types/auth.types";
import { useAuthStore } from "../stores/authStore";
import { theme } from "../styles/theme";

const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLoading, error } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const { handleSubmit } = useForm<LoginCredentials>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);

    navigate("/dashboard");
  });

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
    max-width: 400px;
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

  const demoCredentialsStyles = css`
    margin-top: ${theme.spacing.xl};
    padding: ${theme.spacing.lg};
    background-color: ${theme.colors.gray[50]};
    border-radius: ${theme.borderRadius.md};
    border: 1px solid ${theme.colors.gray[200]};
  `;

  const demoTitleStyles = css`
    font-size: ${theme.typography.fontSize.sm};
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.gray[700]};
    margin: 0 0 ${theme.spacing.sm} 0;
  `;

  const demoTextStyles = css`
    font-size: ${theme.typography.fontSize.xs};
    color: ${theme.colors.gray[600]};
    margin: ${theme.spacing.xs} 0;
  `;

  return (
    <div css={containerStyles}>
      <Card css={cardStyles} padding="lg" shadow="xl">
        <div css={headerStyles}>
          <h1 css={titleStyles}>🔐 {t("adminLogin")}</h1>
          <p css={subtitleStyles}>{t("signInToAdmin")}</p>
        </div>

        <form onSubmit={onSubmit} css={formStyles}>
          {error && <div css={errorAlertStyles}>{error}</div>}

          <Input
            type="email"
            label={t("email")}
            placeholder={t("email")}
            leftIcon="📧"
          />

          <Input
            type={showPassword ? "text" : "password"}
            label={t("password")}
            placeholder={t("password")}
            leftIcon="🔒"
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                css={css`
                  background: none;
                  border: none;
                  cursor: pointer;
                  font-size: ${theme.typography.fontSize.sm};
                  color: ${theme.colors.gray[400]};
                  padding: 0;
                `}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            }
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading}
          >
            {isLoading ? t("loading") : t("signIn")}
          </Button>
        </form>

        <div css={footerStyles}>
          <p css={footerTextStyles}>
            {t("dontHaveAccount")}{" "}
            <Link to="/signup" css={linkStyles}>
              {t("signUp")}
            </Link>
          </p>
        </div>

        <div css={demoCredentialsStyles}>
          <h3 css={demoTitleStyles}>{t("demoCredentials")}</h3>
          <p css={demoTextStyles}>Email: admin@example.com</p>
          <p css={demoTextStyles}>Password: password</p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
