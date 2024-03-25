import { cn } from "@/lib/utils/tailwind.utils";

interface AppBarProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  sticky?: boolean;
}

function AppBar({
  className,
  sticky = false,
  ...props
}: AppBarProps): JSX.Element {
  return (
    <header
      className={cn(
        "flex items-center h-14 w-full p-2 gap-2 bg-white z-10",
        sticky && "sticky top-0",
        className,
      )}
      {...props}
    />
  );
}

function AppBarTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>): JSX.Element {
  return (
    <p
      className={cn("flex-auto text-xl font-semibold", className)}
      {...props}
    />
  );
}

AppBar.Title = AppBarTitle;

export default AppBar;
