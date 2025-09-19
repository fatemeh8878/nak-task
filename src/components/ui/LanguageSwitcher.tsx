import { css } from "@emotion/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { theme } from "../../styles/theme";

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const containerStyles = css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
  `;

  const buttonStyles = css`
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    border: 1px solid ${theme.colors.gray[300]};
    border-radius: ${theme.borderRadius.sm};
    background-color: white;
    color: ${theme.colors.gray[700]};
    font-size: ${theme.typography.fontSize.sm};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: ${theme.colors.gray[50]};
      border-color: ${theme.colors.gray[400]};
    }

    &.active {
      background-color: ${theme.colors.primary[600]};
      color: white;
      border-color: ${theme.colors.primary[600]};
    }
  `;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div css={containerStyles}>
      <button
        css={buttonStyles}
        className={i18n.language === "en" ? "active" : ""}
        onClick={() => changeLanguage("en")}
      >
        🇺🇸 EN
      </button>
      <button
        css={buttonStyles}
        className={i18n.language === "fa" ? "active" : ""}
        onClick={() => changeLanguage("fa")}
      >
        🇮🇷 FA
      </button>
    </div>
  );
};
