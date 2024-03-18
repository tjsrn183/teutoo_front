"use client";
import { useLoginUserInfoQuery } from "@/api/getLoginUserInfo";
import Avatar from "@/components/common/avatar";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function AccountInfo(): JSX.Element {
  const { data: queryData } = useLoginUserInfoQuery();
  const { data } = queryData;
  return (
    <Link className="flex items-center gap-4 mt-4 p-4" href="/editInfo">
      <Avatar>
        <Avatar.Image
          alt="avatar"
          src={data.profileImagePath || "https://placehold.co/40"}
        />
        <Avatar.Fallback>avatar</Avatar.Fallback>
      </Avatar>
      <div>
        <div className="flex items-center">
          <h2 className="font-medium text-lg">{data.name}</h2>
          <ChevronRight />
        </div>
        <p className="text-neutral-400">{data.email}</p>
      </div>
    </Link>
  );
}
