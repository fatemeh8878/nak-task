import React from "react";

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const ProductsActiveIcon: React.FC<IconProps> = ({
  size = 24,
  color = "currentColor",
  className,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M9.354 11.728c.507 0 .919.41.919.918v7.936a.92.92 0 0 1-.919.918H1.418a.92.92 0 0 1-.918-.918v-7.937c0-.506.411-.918.918-.918zM15.276.705a.92.92 0 0 1 1.16 0l.069.063 4.726 4.726a.92.92 0 0 1 0 1.298l-4.726 4.727a.9.9 0 0 1-.323.207h3.617c.506 0 .917.412.917.918v7.937c0 .507-.41.918-.917.918H11.86a.92.92 0 0 1-.918-.918v-7.937a.92.92 0 0 1 .918-.918h3.67a.9.9 0 0 1-.324-.207L10.48 6.793a.9.9 0 0 1-.207-.324v3.67a.92.92 0 0 1-.919.918H1.418a.92.92 0 0 1-.918-.918V2.2c0-.507.411-.917.918-.917h7.936c.507 0 .918.41.919.917v3.617a.9.9 0 0 1 .207-.323L15.208.77z"
        fill={color}
        stroke={color}
      />
    </svg>
  );
};
