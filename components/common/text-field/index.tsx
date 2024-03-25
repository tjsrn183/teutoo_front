"use client";
import { cn } from "@/lib/utils/tailwind.utils";
import * as React from "react";

const TextField = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      className={cn(
        "border-b-2  text-xl font-medium focus-within:border-green-500 border-neutral-300 invalid:border-red-500 invalid:focus-within:border-red-500 outline-none disabled:border-neutral-200 disabled:text-neutral-400 disabled:bg-transparent",
        className,
      )}
      type="text"
      {...props}
      ref={ref}
    />
  );
});

TextField.displayName = "TextField";

export default TextField;
