"use client";

import Avatar from "@/components/common/avatar";
import List from "@/components/common/list";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function SettingsInfo() {
  return (
    <div className="flex flex-col items-center mx-3">
      <Avatar className="w-20 h-20 my-8">
        <Avatar.Image alt="avatar" src="https://placehold.co/80" />
        <Avatar.Fallback>PH</Avatar.Fallback>
      </Avatar>
      <List>
        <List.Item asChild>
          <Link
            className="flex-auto flex items-center border-b border-neutral-200"
            href="/account/settings/username"
          >
            <div className="flex gap-3 flex-auto">
              <div>
                <h2 className="font-medium">이름</h2>
                <p className="text-neutral-500">이름입니다</p>
              </div>
            </div>
            <ChevronRight strokeWidth={1} />
          </Link>
        </List.Item>
        <List.Item asChild>
          <Link
            className="flex-auto flex items-center border-b border-neutral-200"
            href="/account/settings/password"
          >
            <div className="flex gap-3 flex-auto">
              <div>
                <h2 className="font-medium">패스워드</h2>
                <p className="text-neutral-500">••••••••</p>
              </div>
            </div>
            <ChevronRight strokeWidth={1} />
          </Link>
        </List.Item>
        <List.Item asChild>
          <Link
            className="flex-auto flex items-center border-b border-neutral-200"
            href="/account/settings/address"
          >
            <div className="flex gap-3 flex-auto">
              <div>
                <h2 className="font-medium">주소</h2>
                <p className="text-neutral-500">서울특별시 중구 세종대로 110</p>
              </div>
            </div>
            <ChevronRight strokeWidth={1} />
          </Link>
        </List.Item>
      </List>
    </div>
  );
}
