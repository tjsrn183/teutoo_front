import React from "react";
import ChatList from "./_components/chat-list";
import AppBar from "@/components/common/app-bar";
import Search from "@/components/common/search";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import getChatList from "@/api/getChatList";
import FixedBottom from "@/components/layout/fixed-bottom";
import BottomNavigationBar from "@/components/BottomNavigationBar";
import { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: `채팅 - ${SITE_NAME}`,
  description: `${SITE_NAME} 채팅 페이지입니다.`,
};

export default async function ChatPage(): Promise<JSX.Element> {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["chatList"],
    queryFn: () => getChatList(),
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="w-full h-full flex flex-col">
        <AppBar sticky>
          <AppBar.Title>채팅</AppBar.Title>
        </AppBar>

        <ChatList />
        <FixedBottom>
          <BottomNavigationBar />
        </FixedBottom>
      </div>
    </HydrationBoundary>
  );
}
