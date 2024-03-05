import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils/tailwind.utils";

function List({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>): JSX.Element {
  return (
    <ul
      className={cn("flex items-center flex-col w-full", className)}
      {...props}
    />
  );
}

interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  asChild?: boolean;
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "li";
    return (
      <Comp
        className={cn(
          "flex p-2 hover:bg-neutral-100 active:bg-neutral-100 w-full ",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

ListItem.displayName = "ListItem";

List.Item = ListItem;

export default List;
