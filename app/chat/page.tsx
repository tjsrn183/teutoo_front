import React from "react";
import ChatList from "./_components/chat-list";
import AppBar from "@/components/common/app-bar";
import Search from "@/components/common/search";

export default function ChatPage(): JSX.Element {
  return (
    <div className="w-full h-full flex flex-col">
      <AppBar sticky>
        <AppBar.Title>채팅</AppBar.Title>
      </AppBar>

      <ChatList />
    </div>
  );
}
