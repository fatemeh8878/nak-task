import React from "react";

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const DashboardActiveIcon: React.FC<IconProps> = ({
  size = 24,
  color = "currentColor",
  className,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12.222 6.667q-.472 0-.79-.32a1.08 1.08 0 0 1-.32-.791V1.11q0-.472.32-.791a1.08 1.08 0 0 1 .79-.32h6.667q.473 0 .792.32T20 1.11v4.445q0 .471-.32.792a1.07 1.07 0 0 1-.791.319zM1.112 11.11q-.474 0-.792-.32A1.08 1.08 0 0 1 0 10V1.111Q0 .64.32.32A1.08 1.08 0 0 1 1.111 0h6.667q.473 0 .792.32t.319.791V10q0 .473-.32.792a1.07 1.07 0 0 1-.791.32zM12.221 20q-.472 0-.79-.32a1.08 1.08 0 0 1-.32-.791V10q0-.473.32-.791a1.08 1.08 0 0 1 .79-.32h6.667q.473 0 .792.32T20 10v8.889q0 .473-.32.792t-.791.319zm-11.11 0q-.474 0-.792-.32a1.08 1.08 0 0 1-.32-.791v-4.445q0-.472.32-.79a1.08 1.08 0 0 1 .791-.32h6.667q.473 0 .792.32t.319.79v4.445q0 .473-.32.792t-.79.319z"
        fill={color}
      />
    </svg>
  );
};
