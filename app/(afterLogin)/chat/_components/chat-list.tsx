"use client";
import { useChatListQuery } from "@/api/getChatList";
import Avatar from "@/components/common/avatar";
import Badge from "@/components/common/badge";
import List from "@/components/common/list";
import Search from "@/components/common/search";
import React from "react";

export default function ChatList(): JSX.Element {
  const [search, setSearch] = React.useState("");
  const { data } = useChatListQuery();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredChats = data.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-2">
      <Search
        className="w-full"
        placeholder="이름을 검색하세요..."
        value={search}
        onChange={handleSearch}
      />
      <List className="mt-4 bg-white">
        {filteredChats.map((chat, i) => (
          <List.Item className="flex gap-2" key={i}>
            <Avatar square>
              <Avatar.Image
                alt="avatar"
                src={chat.profileImgUrl || "https://placehold.co/80"}
              />
            </Avatar>
            <div>
              <p className="font-medium">{chat.name}</p>
              <p className="text-sm text-neutral-500">
                {chat.latestChat?.content}
              </p>
            </div>
            <div className="flex-1 text-right text-sm">
              <p className=" text-neutral-500">오후 3:45</p>
              {chat.unReadChatCnt > 0 && (
                <Badge className="mt-1" type="number">
                  {chat.unReadChatCnt.toString()}
                </Badge>
              )}
            </div>
          </List.Item>
        ))}
      </List>
    </div>
  );
}
