import { css } from "@emotion/react";
import React from "react";
import { theme } from "../../styles/theme";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
  shadow?: "sm" | "md" | "lg" | "xl";
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  padding = "md",
  hover = false,
  onClick,
}) => {
  const paddingSizes = {
    sm: theme.spacing.md,
    md: theme.spacing.lg,
    lg: theme.spacing.xl,
  };

  const cardStyles = css`
    background-color: white;
    border-radius: ${theme.borderRadius.lg};
    padding: ${paddingSizes[padding]};
    transition: all 0.2s ease;

    ${hover &&
    css`
      cursor: pointer;

      &:hover {
        box-shadow: ${theme.shadows.xl};
        transform: translateY(-2px);
      }
    `}

    ${onClick &&
    css`
      cursor: pointer;

      &:hover {
        box-shadow: ${theme.shadows.xl};
        transform: translateY(-2px);
      }
    `}
  `;

  return (
    <div css={cardStyles} className={className} onClick={onClick}>
      {children}
    </div>
  );
};
