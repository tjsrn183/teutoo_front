"use client";
import React from "react";
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  backgroundColor?: string;
}
//
export default function LightButton({
  children,
  onClick,
  className = "",
  type = "button",
  backgroundColor = "bg-[#22C55E]",
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`text-white rounded-[6px] w-full h-[48px] ${backgroundColor} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
