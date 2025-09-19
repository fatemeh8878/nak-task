import { css } from "@emotion/react";
import React, { useState } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { useController } from "react-hook-form";
import { theme } from "../../styles/theme";

interface ControlledInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  helperText?: string;
}

export const ControlledInput = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  fullWidth = false,
  leftIcon,
  rightIcon,
  helperText,
}: ControlledInputProps<T>) => {
  const [isFocused, setIsFocused] = useState(false);

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const hasValue = field.value && field.value.toString().length > 0;
  const isLabelFloating = isFocused || hasValue;
  const inputStyles = css`
    width: ${fullWidth ? "100%" : "auto"};
    padding: ${isLabelFloating ? "12px 20px" : "12px 20px"};
    font-size: 16px;
    border: none;
    border-radius: 9999px;
    background-color: #00000005 !important;
    color: ${theme.colors.gray[900]};
    transition: all 0.2s ease;
    outline: none;

    &:disabled {
      background-color: #00000005 !important;
      color: ${theme.colors.gray[500]};
      cursor: not-allowed;
      border-color: ${theme.colors.gray[200]};
    }

    &::placeholder {
      color: transparent;
    }

    ${leftIcon &&
    css`
      padding-left: 24px;
    `}

    ${rightIcon &&
    css`
      padding-right: 24px;
    `}
  `;

  const containerStyles = css`
    position: relative;
    width: ${fullWidth ? "100%" : "auto"};
    margin-bottom: 16px;
  `;

  const labelStyles = css`
    position: absolute;
    left: 35px;
    top: ${isLabelFloating ? "-11px" : "50%"};
    transform: ${isLabelFloating
      ? "translateY(0) scale(0.85)"
      : "translateY(-50%) scale(1)"};

    font-size: ${isLabelFloating ? "18px" : "20px"};
    font-weight: 600;
    color: ${error ? "#EF4444" : isLabelFloating ? "#000000" : "#00000033"};
    background-color: ${isLabelFloating ? "transparent" : "none"};
    padding: 0 6px;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
    z-index: 1;
    transform-origin: left top;
    line-height: 1;
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
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
  `;

  const rightIconStyles = css`
    ${iconStyles}
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
  `;

  const errorStyles = css`
    font-size: 12px;
    color: #ef4444;
    margin-top: 4px;
    margin-left: 0;
  `;

  const helperTextStyles = css`
    font-size: 12px;
    color: #6b7280;
    margin-top: 4px;
    margin-left: 0;
  `;

  return (
    <div css={containerStyles}>
      {label && <label css={labelStyles}>{label}</label>}
      <div css={inputContainerStyles}>
        {leftIcon && <div css={leftIconStyles}>{leftIcon}</div>}
        <input
          {...field}
          css={inputStyles}
          placeholder={isLabelFloating ? placeholder : ""}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {rightIcon && <div css={rightIconStyles}>{rightIcon}</div>}
      </div>
      {error && <span css={errorStyles}>{error.message}</span>}
      {!error && helperText && <span css={helperTextStyles}>{helperText}</span>}
    </div>
  );
};
