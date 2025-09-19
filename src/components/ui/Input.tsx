import { css } from "@emotion/react";
import React, { forwardRef } from "react";
import { theme } from "../../styles/theme";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className,
      ...props
    },
    ref
  ) => {
    const inputStyles = css`
      width: ${fullWidth ? "100%" : "auto"};
      padding: ${theme.spacing.md};
      font-size: ${theme.typography.fontSize.base};
      border: 1px solid
        ${error ? theme.colors.error[300] : theme.colors.gray[300]};
      border-radius: ${theme.borderRadius.md};
      background-color: white;
      color: ${theme.colors.gray[900]};
      transition: border-color 0.2s ease, box-shadow 0.2s ease;

      &:focus {
        border-color: ${error
          ? theme.colors.error[500]
          : theme.colors.primary[500]};
        box-shadow: 0 0 0 3px
          ${error ? theme.colors.error[100] : theme.colors.primary[100]};
      }

      &:disabled {
        background-color: ${theme.colors.gray[50]};
        color: ${theme.colors.gray[500]};
        cursor: not-allowed;
      }

      &::placeholder {
        color: ${theme.colors.gray[400]};
      }

      ${leftIcon &&
      css`
        padding-left: 40px;
      `}

      ${rightIcon &&
      css`
        padding-right: 40px;
      `}
    `;

    const containerStyles = css`
      display: flex;
      flex-direction: column;
      gap: ${theme.spacing.sm};
      width: ${fullWidth ? "100%" : "auto"};
    `;

    const labelStyles = css`
      font-size: ${theme.typography.fontSize.sm};
      font-weight: ${theme.typography.fontWeight.medium};
      color: ${theme.colors.gray[700]};
    `;

    const inputContainerStyles = css`
      position: relative;
      display: flex;
      align-items: center;
    `;

    const iconStyles = css`
      position: absolute;
      color: ${theme.colors.gray[400]};
      pointer-events: none;
    `;

    const leftIconStyles = css`
      ${iconStyles}
      left: ${theme.spacing.md};
    `;

    const rightIconStyles = css`
      ${iconStyles}
      right: ${theme.spacing.md};
    `;

    const errorStyles = css`
      font-size: ${theme.typography.fontSize.sm};
      color: ${theme.colors.error[600]};
    `;

    const helperTextStyles = css`
      font-size: ${theme.typography.fontSize.sm};
      color: ${theme.colors.gray[500]};
    `;

    return (
      <div css={containerStyles}>
        {label && <label css={labelStyles}>{label}</label>}
        <div css={inputContainerStyles}>
          {leftIcon && <div css={leftIconStyles}>{leftIcon}</div>}
          <input ref={ref} css={inputStyles} className={className} {...props} />
          {rightIcon && <div css={rightIconStyles}>{rightIcon}</div>}
        </div>
        {error && <span css={errorStyles}>{error}</span>}
        {helperText && !error && (
          <span css={helperTextStyles}>{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
