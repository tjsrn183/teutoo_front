"use client";
import Avatar from "@/components/common/avatar";
import Badge from "@/components/common/badge";
import List from "@/components/common/list";
import Search from "@/components/common/search";
import React from "react";

const CHAT_LIST = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  name: "이름입니다",
  lastMessage: "마지막 메시지입니다",
  time: "오후 3:45",
  unread: 9,
}));

export default function ChatList(): JSX.Element {
  const [search, setSearch] = React.useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredChats = CHAT_LIST.filter((chat) =>
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
        {filteredChats.map((_, i) => (
          <List.Item className="flex gap-2" key={i}>
            <Avatar square>
              <Avatar.Image
                alt="avatar"
                src="https://randomuser.me/api/portraits/women/31.jpg"
              />
            </Avatar>
            <div>
              <p className="font-medium">이름입니다</p>
              <p className="text-sm text-neutral-500">마지막 메시지입니다</p>
            </div>
            <div className="flex-1 text-right text-sm">
              <p className=" text-neutral-500">오후 3:45</p>
              <Badge>9</Badge>
            </div>
          </List.Item>
        ))}
      </List>
    </div>
  );
}
