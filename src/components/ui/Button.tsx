import { css } from "@emotion/react";
import React from "react";
import { theme } from "../../styles/theme";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

const buttonVariants = {
  primary: css`
    background-color: ${theme.colors.primary[600]};
    color: white;
    border: 1px solid ${theme.colors.primary[600]};

    &:hover:not(:disabled) {
      background-color: ${theme.colors.primary[700]};
      border-color: ${theme.colors.primary[700]};
    }

    &:active:not(:disabled) {
      background-color: ${theme.colors.primary[800]};
      border-color: ${theme.colors.primary[800]};
    }
  `,
  secondary: css`
    background-color: ${theme.colors.gray[100]};
    color: ${theme.colors.gray[900]};
    border: 1px solid ${theme.colors.gray[300]};

    &:hover:not(:disabled) {
      background-color: ${theme.colors.gray[200]};
      border-color: ${theme.colors.gray[400]};
    }

    &:active:not(:disabled) {
      background-color: ${theme.colors.gray[300]};
      border-color: ${theme.colors.gray[500]};
    }
  `,
  outline: css`
    background-color: transparent;
    color: ${theme.colors.primary[600]};
    border: 1px solid ${theme.colors.primary[600]};

    &:hover:not(:disabled) {
      background-color: ${theme.colors.primary[50]};
    }

    &:active:not(:disabled) {
      background-color: ${theme.colors.primary[100]};
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${theme.colors.gray[600]};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background-color: ${theme.colors.gray[100]};
      color: ${theme.colors.gray[900]};
    }

    &:active:not(:disabled) {
      background-color: ${theme.colors.gray[200]};
    }
  `,
  danger: css`
    background-color: ${theme.colors.error[600]};
    color: white;
    border: 1px solid ${theme.colors.error[600]};

    &:hover:not(:disabled) {
      background-color: ${theme.colors.error[700]};
      border-color: ${theme.colors.error[700]};
    }

    &:active:not(:disabled) {
      background-color: ${theme.colors.error[800]};
      border-color: ${theme.colors.error[800]};
    }
  `,
};

const buttonSizes = {
  sm: css`
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    font-size: ${theme.typography.fontSize.sm};
    border-radius: ${theme.borderRadius.sm};
  `,
  md: css`
    padding: ${theme.spacing.md} ${theme.spacing.lg};
    font-size: ${theme.typography.fontSize.base};
    border-radius: ${theme.borderRadius.md};
  `,
  lg: css`
    padding: ${theme.spacing.lg} ${theme.spacing.xl};
    font-size: ${theme.typography.fontSize.lg};
    border-radius: ${theme.borderRadius.md};
  `,
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled,
  children,
  ...props
}) => {
  const buttonStyles = css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: ${theme.typography.fontWeight.medium};
    transition: all 0.2s ease;
    cursor: pointer;
    box-shadow: ${theme.shadows.sm};

    ${fullWidth &&
    css`
      width: 100%;
    `}

    ${disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
    `}

    ${loading &&
    css`
      position: relative;
      color: transparent;

      &::after {
        content: "";
        position: absolute;
        width: 16px;
        height: 16px;
        border: 2px solid currentColor;
        border-radius: 50%;
        border-top-color: transparent;
        animation: spin 1s linear infinite;
      }
    `}

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    ${buttonVariants[variant]}
    ${buttonSizes[size]}
  `;

  return (
    <button css={buttonStyles} disabled={disabled || loading} {...props}>
      {children}
    </button>
  );
};
