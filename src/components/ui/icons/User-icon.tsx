import React from "react";

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const UserIcon: React.FC<IconProps> = ({
  size = 24,
  color = "currentColor",
  className,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M20 20a8.75 8.75 0 1 0 0-17.5A8.75 8.75 0 0 0 20 20M9.375 22.5A4.375 4.375 0 0 0 5 26.875v.625c0 2.991 1.904 5.521 4.606 7.241C12.324 36.471 16.003 37.5 20 37.5s7.675-1.029 10.394-2.759C33.096 33.021 35 30.491 35 27.5v-.625a4.375 4.375 0 0 0-4.375-4.375z"
        fill={color}
      />
    </svg>
  );
};
