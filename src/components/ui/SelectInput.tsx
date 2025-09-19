import { css } from "@emotion/react";
import React, { useState } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { useController } from "react-hook-form";
import { theme } from "../../styles/theme";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  options: SelectOption[];
  variant?: "default" | "rounded";
}

export const SelectInput = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  fullWidth = false,
  leftIcon,
  rightIcon,
  options,
  variant = "default",
}: SelectInputProps<T>) => {
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

  const baseSelectStyles = css`
    width: ${fullWidth ? "100%" : "auto"};
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    border: none;
    color: #000000;
    transition: all 0.2s ease;
    outline: none;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 12px center;
    background-repeat: no-repeat;
    background-size: 16px;

    &:disabled {
      background-color: #00000005 !important;
      color: #000000;
      cursor: not-allowed;
      border-color: #000000;
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

  const selectStyles = css`
    ${baseSelectStyles}
    ${variant === "default" &&
    css`
      padding: 23px;
      border-radius: 9999px;
      background-color: #00000005 !important;
    `}
    ${variant === "rounded" &&
    css`
      height: 55px;
      padding: 0 24px;
      border-radius: 40px;
      background-color: #ffffff;
      border: 1px solid #e5e7eb;

      &:focus {
        border-color: #000000;
        background-color: #ffffff;
      }

      &:hover {
        border-color: #9ca3af;
      }
    `}
  `;

  const containerStyles = css`
    position: relative;
    width: ${fullWidth ? "100%" : "auto"};
  `;

  const labelStyles = css`
    position: absolute;
    left: ${variant === "default" ? "35px" : "28px"};
    top: ${isLabelFloating ? "-8px" : error ? "35%" : "50%"};
    transform: ${isLabelFloating
      ? "translateY(0) scale(0.85)"
      : "translateY(-50%) scale(1)"};

    font-size: ${isLabelFloating ? "14px" : "16px"};
    font-weight: ${isLabelFloating ? "500" : "400"};
    color: ${isLabelFloating ? (error ? "#EF4444" : "#374151") : "#6b7280"};
    background-color: ${isLabelFloating ? "#ffffff" : "transparent"};
    padding: ${isLabelFloating ? "0 8px" : "0"};
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
    z-index: 1;
    transform-origin: left top;
    line-height: 1;
    border-radius: 4px;
  `;

  const selectContainerStyles = css`
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

  return (
    <div css={containerStyles}>
      {label && <label css={labelStyles}>{label}</label>}
      <div css={selectContainerStyles}>
        {leftIcon && <div css={leftIconStyles}>{leftIcon}</div>}
        <select
          {...field}
          css={selectStyles}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => {
            field.onChange(e.target.value);
          }}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {rightIcon && <div css={rightIconStyles}>{rightIcon}</div>}
      </div>
      <span css={errorStyles}>{error ? error?.message : " "}</span>
    </div>
  );
};
