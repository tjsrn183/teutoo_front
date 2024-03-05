import { cn } from "@/lib/utils/tailwind.utils";

export default function FixedBottom({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  return (
    <div
      className={cn("fixed bottom-0 w-full max-w-md bg-white p-4", className)}
      {...props}
    />
  );
}
