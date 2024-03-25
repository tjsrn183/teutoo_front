/**
 * Represents a badge component.
 */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/tailwind.utils";

/**
 * The variants for the badge component.
 */
export const badgeVariants = cva(
  "inline-flex items-center border-white justify-center rounded-full text-white border text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-green-500",
        destructive: "bg-red-500",
      },
      type: {
        letter: "w-5 h-5",
        dot: "w-3 h-3",
        number: "h-5 px-1 min-w-5",
      },
    },
    defaultVariants: {
      variant: "default",
      type: "number",
    },
  },
);

/**
 * The props for the Badge component.
 */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  children: string;
}

/**
 * Renders a badge component.
 * @param className - The additional class name for the badge.
 * @param variant - The variant of the badge.
 * @param children - The content of the badge.
 * @param type - The type of the badge.
 * @param props - The additional HTML attributes for the badge.
 * @returns The rendered badge component.
 * @throws Error if the children of the badge is not a single character or number.
 */
function Badge({
  className,
  variant,
  children,
  type,
  ...props
}: BadgeProps): JSX.Element {
  if (type === "letter" && children.length > 1)
    throw new Error("Badge children must be a single character or number.");
  const value = parseInt(children) > 999 ? "999+" : children;
  return (
    <div
      className={cn(badgeVariants({ variant, type }), className)}
      {...props}
      data-badge={children}
    >
      {type !== "dot" && value}
    </div>
  );
}

export default Badge;
