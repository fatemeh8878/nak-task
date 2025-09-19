import { css } from "@emotion/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { theme } from "../../styles/theme";
import { Sidebar } from "./Sidebar";

export const AdminLayout: React.FC = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "fa";

  const layoutStyles = css`
    display: flex;
    min-height: 100vh;
    background: linear-gradient(167.98deg, #f4f4f4 0%, #f6f6f6 100%);
  `;

  const mainStyles = css`
    flex: 1;
    margin-left: 300px;
    transition: margin-left 0.3s ease;
    display: flex;
    flex-direction: column;
    direction: ${isRTL ? "rtl" : "ltr"};
  `;

  const contentStyles = css`
    flex: 1;
    padding: ${theme.spacing.xl};
    overflow-y: auto;
  `;

  return (
    <div css={layoutStyles}>
      <Sidebar />
      <main css={mainStyles}>
        <div css={contentStyles}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
