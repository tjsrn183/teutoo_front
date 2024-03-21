import ChatClient from "@/app/(afterLogin)/chat/[receiverId]/_components/chat-client";

interface ChatRoomPageProps {
  params: {
    receiverId: string;
  };
}

export default function ChatRoomPage({
  params,
}: ChatRoomPageProps): JSX.Element {
  const receiverId = parseInt(params.receiverId);
  return <ChatClient receiverId={receiverId} />;
}
