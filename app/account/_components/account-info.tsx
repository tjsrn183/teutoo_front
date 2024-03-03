"use client";
import Avatar from "@/components/common/avatar";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function AccountInfo(): JSX.Element {
  return (
    <Link className="flex items-center gap-4 mt-4 p-4" href="/account/settings">
      <Avatar>
        <Avatar.Image alt="avatar" src="https://placehold.co/40" />
        <Avatar.Fallback>PH</Avatar.Fallback>
      </Avatar>
      <div>
        <div className="flex items-center">
          <h2 className="font-medium text-lg">이름님</h2>
          <ChevronRight />
        </div>
        <p className="text-neutral-400">abcd1234@gmail.com</p>
      </div>
    </Link>
  );
}
