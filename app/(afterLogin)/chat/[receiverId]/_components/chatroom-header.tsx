"use client";

import { useChatContext } from "@/app/(afterLogin)/chat/[receiverId]/_components/chat-client";
import BackButton from "@/components/BackButton";
import AppBar from "@/components/common/app-bar";
import Avatar from "@/components/common/avatar";
import Button from "@/components/common/button";
import { MoreVertical } from "lucide-react";
import React from "react";

export default function ChatRoomHeader(): JSX.Element {
  const { receiver } = useChatContext();
  return (
    <AppBar sticky>
      <BackButton />
      <div>
        <Avatar className="w-10 h-10">
          <Avatar.Image
            alt="avatar"
            src={receiver?.imgUrl || "/blank-profile.webp"}
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
