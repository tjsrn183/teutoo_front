import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils/tailwind.utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium text-base",
  {
    variants: {
      variant: {
        default:
          "bg-green-500 text-white hover:bg-green-600 disabled:bg-neutral-300",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 disabled:bg-neutral-300",
        outline:
          "border border-neutral-300 text-black bg-transparent hover:bg-neutral-100 disabled:text-neutral-300",
        ghost: "bg-transparent text-black hover:bg-neutral-100",
      },
      size: {
        default: "h-10 px-6 py-2",
        icon: "h-10 w-10 p-2",
      },
      circle: {
        false: "rounded-md",
        true: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      circle: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, circle, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, circle, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export default Button;
export { buttonVariants };
