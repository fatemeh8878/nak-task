import { css } from "@emotion/react";
import React from "react";
import {
  useController,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

interface InputProps<T extends FieldValues = FieldValues>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
  name: FieldPath<T>;
  control: Control<T>;
  fullWidth?: boolean;
}

export const Input = <T extends FieldValues = FieldValues>({
  name,
  control,
  fullWidth = false,
  className,
  ...props
}: InputProps<T>) => {
  const { field } = useController({
    name,
    control,
  });
  const inputStyles = css`
    width: ${fullWidth ? "100%" : "auto"};
    padding: 8px 12px;
    font-size: 14px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    background-color: white;
    color: #000;
    outline: none;

    &:focus {
      border-color: #000;
    }

    &:disabled {
      background-color: #f9fafb;
      color: #6b7280;
      cursor: not-allowed;
    }
  `;

  return (
    <input {...field} css={inputStyles} className={className} {...props} />
  );
};

Input.displayName = "Input";
