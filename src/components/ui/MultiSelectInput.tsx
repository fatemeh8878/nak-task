import { css } from "@emotion/react";
import React, {
  type InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { useController } from "react-hook-form";
import { theme } from "../../styles/theme";

interface SelectOption {
  value: string;
  label: string;
}

interface MultiSelectInputProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  options: SelectOption[];
  variant?: "default" | "rounded";
  disabled?: boolean;
}

export const MultiSelectInput = <T extends FieldValues>({
  name,
  control,
  placeholder,
  fullWidth = false,
  leftIcon,
  rightIcon,
  options,
  variant = "default",
  disabled = false,
}: MultiSelectInputProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  const selectedValues: string[] = field.value || [];
  const handleToggleOption = (optionValue: string) => {
    const newValues = selectedValues.includes(optionValue)
      ? selectedValues.filter((val: string) => val !== optionValue)
      : [...selectedValues, optionValue];

    field.onChange(newValues);
  };

  const handleRemoveValue = (valueToRemove: string) => {
    const newValues = selectedValues.filter(
      (val: string) => val !== valueToRemove
    );
    field.onChange(newValues);
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

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
    min-height: 55px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    padding: 12px 40px 12px 12px;

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
    ${disabled &&
    css`
      background-color: #00000005 !important;
      color: #000000;
      cursor: not-allowed;
      border-color: #000000;
    `}
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

  const selectContainerStyles = css`
    position: relative;
    display: flex;
    align-items: center;
  `;

  const dropdownStyles = css`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    max-height: 200px;
    overflow-y: auto;
    margin-top: 4px;
  `;

  const optionStyles = css`
    padding: 12px 16px;
    cursor: pointer;
    border-bottom: 1px solid #f3f4f6;
    display: flex;
    align-items: center;
    gap: 8px;

    &:hover {
      background-color: #f9fafb;
    }

    &:last-child {
      border-bottom: none;
    }
  `;

  const selectedOptionStyles = css`
    background-color: #eff6ff;
    color: #1d4ed8;
  `;

  const tagStyles = css`
    background-color: #e5e7eb;
    color: #374151;
    padding: 4px 8px;
    border-radius: 16px;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 4px;
  `;

  const removeTagStyles = css`
    background: none;
    border: none;
    color: #6b7280;
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
    padding: 0;
    margin-left: 4px;

    &:hover {
      color: #ef4444;
    }
  `;

  const placeholderStyles = css`
    color: #9ca3af;
    font-style: italic;
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
    <div css={containerStyles} ref={containerRef}>
      <div css={selectContainerStyles}>
        {leftIcon && <div css={leftIconStyles}>{leftIcon}</div>}
        <div css={selectStyles} onClick={() => disabled || setIsOpen(!isOpen)}>
          {selectedValues.length === 0 || disabled ? (
            <span css={placeholderStyles}>
              {placeholder || "Select options..."}
            </span>
          ) : (
            selectedValues.map((value: string) => {
              const option = options.find((opt) => opt.value === value);
              return (
                <span key={value} css={tagStyles}>
                  {option?.label || value}
                  <button
                    type="button"
                    css={removeTagStyles}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveValue(value);
                    }}
                  >
                    ×
                  </button>
                </span>
              );
            })
          )}
        </div>
        {rightIcon && <div css={rightIconStyles}>{rightIcon}</div>}
      </div>

      {isOpen && !disabled && (
        <div css={dropdownStyles}>
          {options.map((option) => (
            <div
              key={option.value}
              css={[
                optionStyles,
                selectedValues.includes(option.value) && selectedOptionStyles,
              ]}
              onClick={() => handleToggleOption(option.value)}
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(option.value)}
                onChange={() => {}} // Handled by onClick
                style={{ margin: 0 }}
              />
              {option.label}
            </div>
          ))}
        </div>
      )}

      <span css={errorStyles}>{error ? error?.message : " "}</span>
    </div>
  );
};
