import ChatClient from "@/app/(afterLogin)/chat/[receiverId]/_components/chat-client";
import { SITE_NAME } from "@/lib/constants/site";

interface ChatRoomPageProps {
  params: {
    receiverId: string;
  };
}

import { Metadata } from "next";

export const metadata: Metadata = {
  title: `채팅 - ${SITE_NAME}`,
  description: `${SITE_NAME} 채팅 페이지입니다.`,
};

export default function ChatRoomPage({
  params,
}: ChatRoomPageProps): JSX.Element {
  const receiverId = parseInt(params.receiverId);
  return <ChatClient receiverId={receiverId} />;
}
