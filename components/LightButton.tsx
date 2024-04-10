"use client";
import React from "react";
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  backgroundColor?: string;
  height?: string;
  width?: string;
  activeBackColor?: string;
}

export default function LightButton({
  children,
  onClick,
  className = "",
  type = "button",
  backgroundColor = "bg-[#22C55E]",
  height,
  width,
  activeBackColor = "active:bg-[#90dfad]",
}: ButtonProps) {
  return (
    <button
      type={type}
      className={` ${activeBackColor} text-white rounded-[6px] ${
        width ? width : "w-full"
      } ${height ? height : "h-[48px]"}  ${backgroundColor} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
