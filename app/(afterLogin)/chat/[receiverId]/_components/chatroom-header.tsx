"use client";

import AppBar from "@/components/common/app-bar";
import Avatar from "@/components/common/avatar";
import Button from "@/components/common/button";
import { ArrowLeft, MoreVertical } from "lucide-react";
import React from "react";

export default function ChatRoomHeader(): JSX.Element {
  return (
    <AppBar sticky>
      <Button size="icon" variant="ghost">
        <ArrowLeft />
      </Button>
      <div>
        <Avatar className="w-10 h-10">
          <Avatar.Image
            alt="avatar"
            src="https://randomuser.me/api/portraits/women/31.jpg"
          />
        </Avatar>
      </div>
      <div className="flex-auto">
        <p className="font-medium">이름입니다</p>
        <p className="text-neutral-500 text-sm">온라인</p>
      </div>
      <Button size="icon" variant="ghost">
        <MoreVertical />
      </Button>
    </AppBar>
  );
}
