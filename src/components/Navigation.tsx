import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "../hooks/useTranslation";

const Navigation: React.FC = () => {
  const { t, isRTL } = useTranslation();
  const location = useLocation();

  const navItems = [
    { path: "/", key: "navigation.home" },
    { path: "/about", key: "navigation.about" },
    { path: "/contact", key: "navigation.contact" },
    { path: "/settings", key: "navigation.settings" },
  ];

  const navStyle: React.CSSProperties = {
    display: "flex",
    gap: "20px",
    padding: "10px 0",
    borderBottom: "1px solid #eee",
    marginBottom: "20px",
    flexDirection: isRTL() ? "row-reverse" : "row",
  };

  const linkStyle: React.CSSProperties = {
    textDecoration: "none",
    color: "#333",
    padding: "8px 16px",
    borderRadius: "4px",
    transition: "background-color 0.2s",
  };

  const activeLinkStyle: React.CSSProperties = {
    ...linkStyle,
    backgroundColor: "#007bff",
    color: "white",
  };

  return (
    <nav style={navStyle}>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          style={location.pathname === item.path ? activeLinkStyle : linkStyle}
        >
          {t(item.key)}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
