import { css } from "@emotion/react";
import React from "react";
import { theme } from "../../styles/theme";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "black" | "white" | "iconButton";
  size?: "sm" | "md" | "xs";
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

const buttonVariants = {
  black: css`
    background-color: #000000;
    color: white;
    border: none;

    &:hover:not(:disabled) {
      background-color: #000000;
    }

    &:active:not(:disabled) {
      background-color: #000000;
    }
  `,
  white: css`
    background-color: transparent;
    color: #000000;
    border: 1px solid #000000;

    &:hover:not(:disabled) {
      border: 1px solid #000000;
      background-color: white;
    }

    &:active:not(:disabled) {
      border: 1px solid #000000;
      background-color: white;
    }
  `,
  iconButton: css`
    background-color: transparent;
    color: #000000;
    border: 1px solid #000000;
    border-radius: 50%;
    &:hover:not(:disabled) {
      border: 1px solid #000000;
      background-color: white;
    }

    &:active:not(:disabled) {
      border: 1px solid #000000;
      background-color: white;
    }
  `,
};

const buttonSizes = {
  sm: css`
    height: 40px;
    padding: 0 ${theme.spacing.lg};
    font-size: ${theme.typography.fontSize.base};
    border-radius: 40px;
  `,
  md: css`
    height: 55px;
    padding: 0;
    font-size: 20px;
    width: 200px;
    border-radius: 50px;
  `,
  xs: css`
    height: 50px;
    width: 50px;
    padding: 0;
    font-size: 20px;
    border-radius: 50%;
  `,
};

export const Button: React.FC<ButtonProps> = ({
  variant = "black",
  size = "sm",
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
