"use client";
import Search from "@/components/common/search";
import { cn } from "@/lib/utils/tailwind.utils";
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

interface SearchContainerProps {
  sort?: "alpha" | "review";
  direction?: "asc" | "desc";
  search?: string;
}

interface FilterButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
}

function FilterButton({ className, checked, ...props }: FilterButtonProps) {
  return (
    <button
      className={cn(
        "bg-white border border-neutral-200 rounded-full px-3 py-1 ml-2 flex items-center gap-0.5",
        checked ? "border-green-500" : "border-neutral-200",
        className,
      )}
      {...props}
    />
  );
}

export default function SearchContainer({
  sort = "alpha",
  direction = "asc",
  search,
}: SearchContainerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const toggleDirection = useCallback(() => {
    const newDirection = direction === "asc" ? "desc" : "asc";
    router.replace(
      `${pathname}?${createQueryString("direction", newDirection)}`,
    );
  }, [direction, pathname, createQueryString, router]);

  const toggleSort = useCallback(() => {
    const newSort = sort === "alpha" ? "review" : "alpha";
    router.replace(`${pathname}?${createQueryString("sort", newSort)}`);
  }, [sort, pathname, createQueryString, router]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.replace(
        `${pathname}?${createQueryString("search", e.currentTarget.value)}`,
      );
    }
  };
  return (
    <div>
      <Search
        className="w-full"
        placeholder="트레이너, 헬스장 이름을 검색하세요..."
        defaultValue={search}
        onKeyDown={handleKeyDown}
      />
      <div className="flex py-2">
        <FilterButton onClick={toggleSort} checked={sort === "review"}>
          {sort === "alpha" ? "이름순" : "리뷰순"}
        </FilterButton>
        <FilterButton onClick={toggleDirection} checked={direction === "desc"}>
          {direction === "asc" ? "오름차순" : "내림차순"}
          {direction === "asc" ? (
            <ArrowUpNarrowWide className="text-neutral-400" size={20} />
          ) : (
            <ArrowDownNarrowWide className="text-neutral-400" size={20} />
          )}
        </FilterButton>
      </div>
    </div>
  );
}
