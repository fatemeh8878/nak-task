import React from "react";

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const LogoutIcon: React.FC<IconProps> = ({
  size = 24,
  color = "currentColor",
  className,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.59L17 17L22 12L17 7Z"
        fill={color}
      />
      <path
        d="M4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z"
        fill={color}
      />
    </svg>
  );
};
