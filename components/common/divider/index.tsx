import { cn } from "@/lib/utils/tailwind.utils";
import React from "react";

export default function Divider({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>): JSX.Element {
  return (
    <div className={cn("w-full h-1 bg-neutral-200", className)} {...props} />
  );
}
