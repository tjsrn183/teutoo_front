import { cn } from "@/lib/utils/tailwind.utils";
import React from "react";

interface StarProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export default function Star({ className, ...props }: StarProps): JSX.Element {
  return (
    <svg
      className={cn("fill-yellow-300 w-6 h-6", className)}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M13.839 1.1939L16.4365 6.67743L22.2427 7.55736C23.9227 7.81134 24.5965 9.96515 23.378 11.201L19.1762 15.4687L20.1694 21.4982C20.4556 23.242 18.6981 24.5739 17.1934 23.75L12.0002 20.9042L6.807 23.75C5.30239 24.5739 3.54485 23.242 3.83101 21.4982L4.82424 15.4687L0.622399 11.201C-0.59606 9.96515 0.075939 7.81134 1.75778 7.55736L7.56392 6.67743L10.1615 1.1939C10.9147 -0.397966 13.0858 -0.397966 13.839 1.1939Z"
        fill="#FFCE21"
        fillRule="evenodd"
      />
    </svg>
  );
}
