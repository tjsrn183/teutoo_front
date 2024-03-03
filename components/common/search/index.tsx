import * as React from "react";
import { Search as SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils/tailwind.utils";
const Search = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <label
    className={cn("bg-neutral-200 py-2 px-1 rounded-md inline-flex", className)}
  >
    <SearchIcon
      className="text-neutral-400 mx-2"
      size={18}
      aria-label="search"
    />
    <input
      className="bg-neutral-200 placeholder:text-neutral-400 text-sm font-semibold flex-auto"
      ref={ref}
      {...props}
    />
  </label>
));
Search.displayName = "Search";

export default Search;
