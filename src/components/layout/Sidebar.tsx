import { css } from "@emotion/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { theme } from "../../styles/theme";
import {
  AttributesActiveIcon,
  AttributesInactiveIcon,
  DashboardActiveIcon,
  DashboardInactiveIcon,
  LogoutIcon,
  ProductsActiveIcon,
  ProductsInactiveIcon,
  UserIcon,
} from "../ui/icons";

interface NavItem {
  path: string;
  labelKey: string;
  activeIcon: React.ReactNode;
  inactiveIcon: React.ReactNode;
}

export const Sidebar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuthStore();
  const isRTL = i18n.language === "fa";
  const { logout } = useAuthStore();
  const navItems: NavItem[] = [
    {
      path: "/",
      labelKey: "dashboard",
      activeIcon: (
        <DashboardActiveIcon size={20} color={theme.colors.text.black} />
      ),
      inactiveIcon: (
        <DashboardInactiveIcon size={20} color={theme.colors.text.black} />
      ),
    },
    {
      path: "/attributes",
      labelKey: "attributes",
      activeIcon: (
        <AttributesActiveIcon size={20} color={theme.colors.text.black} />
      ),
      inactiveIcon: (
        <AttributesInactiveIcon size={20} color={theme.colors.text.black} />
      ),
    },
    {
      path: "/products",
      labelKey: "products",
      activeIcon: (
        <ProductsActiveIcon size={20} color={theme.colors.text.black} />
      ),
      inactiveIcon: (
        <ProductsInactiveIcon size={20} color={theme.colors.text.black} />
      ),
    },
  ];

  const sidebarStyles = css`
    width: 300px;
    height: 100dvh;
    background: #ffffff66;
    border-radius: 0 40px 40px 0;
    border: 1px solid white;
    display: flex;
    flex-direction: column;
    transition: width 0.3s ease;
    position: fixed;
    left: 0;
    top: 0;
    z-index: ${theme.zIndex.sticky};
    direction: ${isRTL ? "rtl" : "ltr"};
    padding: 0;
  `;

  const userSectionStyles = css`
    display: flex;
    margin: 100px 0 96px 0;
    flex-direction: column;
    align-items: center;

    gap: ${theme.spacing.md};
  `;

  const avatarStyles = css`
    width: 60px;
    height: 60px;
    border-radius: ${theme.borderRadius.full};
    background-color: white;
    color: ${theme.colors.text.black};
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const userNameStyles = css`
    font-size: ${theme.typography.fontSize.base};
    font-weight: ${theme.typography.fontWeight.medium};
    color: ${theme.colors.gray[900]};
    text-align: center;
  `;

  const navStyles = css`
    flex: 1;
    overflow-y: auto;
  `;

  const navItemStyles = css`
    display: flex;
    align-items: center;
    padding: ${theme.spacing.md} ${theme.spacing.xl};
    color: ${theme.colors.text.black};
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      background-color: ${theme.colors.gray[50]};
      color: ${theme.colors.text.black};
      text-decoration: none;
    }

    &.active {
      background-color: ${theme.colors.gray[50]};
      font-weight: ${theme.typography.fontWeight.semibold};
      font-size: ${theme.typography.fontSize.xl};
    }
  `;

  const iconStyles = css`
    font-size: ${theme.typography.fontSize.lg};
    margin-right: ${theme.spacing.md};
    min-width: 24px;
    text-align: center;
  `;

  const labelStyles = css`
    font-size: ${theme.typography.fontSize.base};
    font-weight: ${theme.typography.fontWeight.medium};
    white-space: nowrap;
  `;

  const logoutButtonStyles = css`
    display: flex;
    align-items: center;
    padding: ${theme.spacing.md} ${theme.spacing.xl};
    color: ${theme.colors.gray[600]};
    text-decoration: none;
    transition: all 0.2s ease;
    margin: ${theme.spacing.xs} 0;
    background: none;
    border: none;
    width: 100%;
    cursor: pointer;

    &:hover {
      background-color: ${theme.colors.gray[50]};
      color: ${theme.colors.gray[900]};
    }
  `;
  const location = useLocation();
  return (
    <aside css={sidebarStyles}>
      <div css={userSectionStyles}>
        <div css={avatarStyles}>
          <UserIcon size={40} />
        </div>
        <div css={userNameStyles}>{user || "User"}</div>
      </div>

      <nav css={navStyles}>
        {navItems.map((item) => (
          <NavLink key={item.path} to={item.path} css={navItemStyles}>
            {location.pathname === item.path ? (
              <span css={iconStyles}>{item.activeIcon}</span>
            ) : (
              <span css={iconStyles}>{item.inactiveIcon}</span>
            )}
            <span css={labelStyles}>{t(item.labelKey)}</span>
          </NavLink>
        ))}
      </nav>

      <div
        css={css`
          padding: ${theme.spacing.lg} 0;
        `}
      >
        <button css={logoutButtonStyles} onClick={() => logout()}>
          <span css={iconStyles}>
            <LogoutIcon size={20} />
          </span>
          <span css={labelStyles}>{t("logout")}</span>
        </button>
      </div>
    </aside>
  );
};
