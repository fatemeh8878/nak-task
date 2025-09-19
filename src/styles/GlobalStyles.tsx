import { css, Global } from "@emotion/react";
import "./fonts.css";
import { theme } from "./theme";

export const GlobalStyles = () => (
  <Global
    styles={css`
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: Inter;
      }

      html {
        font-size: 16px;
        line-height: 1.5;
      }

      body {
        font-family: Inter;
        font-size: ${theme.typography.fontSize.base};
        font-weight: ${theme.typography.fontWeight.normal};
        line-height: ${theme.typography.lineHeight.normal};
        color: ${theme.colors.gray[900]};
        background-color: ${theme.colors.gray[50]};
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-weight: ${theme.typography.fontWeight.semibold};
        line-height: ${theme.typography.lineHeight.tight};
        margin-bottom: ${theme.spacing.md};
      }

      h1 {
        font-size: ${theme.typography.fontSize["4xl"]};
      }

      h2 {
        font-size: ${theme.typography.fontSize["3xl"]};
      }

      h3 {
        font-size: ${theme.typography.fontSize["2xl"]};
      }

      h4 {
        font-size: ${theme.typography.fontSize.xl};
      }

      h5 {
        font-size: ${theme.typography.fontSize.lg};
      }

      h6 {
        font-size: ${theme.typography.fontSize.base};
      }

      p {
        margin-bottom: ${theme.spacing.md};
      }

      a {
        color: ${theme.colors.primary[600]};
        text-decoration: none;
        transition: color 0.2s ease;

        &:hover {
          color: ${theme.colors.primary[700]};
          text-decoration: underline;
        }
      }

      button {
        font-family: inherit;
        cursor: pointer;
        border: none;
        outline: none;
        transition: all 0.2s ease;

        &:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }
      }

      input,
      textarea,
      select {
        font-family: inherit;
        font-size: inherit;
        outline: none;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
      }

      /* Scrollbar styling */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      ::-webkit-scrollbar-track {
        background: ${theme.colors.gray[100]};
        border-radius: ${theme.borderRadius.md};
      }

      ::-webkit-scrollbar-thumb {
        background: ${theme.colors.gray[300]};
        border-radius: ${theme.borderRadius.md};

        &:hover {
          background: ${theme.colors.gray[400]};
        }
      }

      /* Focus styles */
      *:focus-visible {
        outline: 2px solid ${theme.colors.primary[500]};
        outline-offset: 2px;
      }

      /* Selection styles */
      ::selection {
        background-color: ${theme.colors.primary[100]};
        color: ${theme.colors.primary[900]};
      }

      /* Utility classes */
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
    `}
  />
);
