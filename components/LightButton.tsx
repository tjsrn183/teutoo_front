"use client";
import React from "react";
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}
//
export default function LightButton({
  children,
  onClick,
  className = "",
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`text-white bg-[#22C55E] rounded-[6px] w-full h-[48px] ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
