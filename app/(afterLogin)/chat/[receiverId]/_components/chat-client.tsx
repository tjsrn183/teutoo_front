"use client";
import ChatContainer from "@/app/(afterLogin)/chat/[receiverId]/_components/chat-container";
import ChatForm from "@/app/(afterLogin)/chat/[receiverId]/_components/chat-form";
import ChatRoomHeader from "@/app/(afterLogin)/chat/[receiverId]/_components/chatroom-header";
import useChatRoom from "@/lib/chat/useChatRoom";
import { createContext, useContext } from "react";

interface ChatClientProps {
  receiverId: number;
}

type ChatContextType = ReturnType<typeof useChatRoom>;

const ChatContext = createContext<ChatContextType | null>(null);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context)
    throw new Error("useChatContext must be used within ChatClient");
  return context;
};

export default function ChatClient({
  receiverId,
}: ChatClientProps): JSX.Element {
  const chat = useChatRoom({
    receiverId,
  });

  if (!chat.roomId) return <div>loading...</div>;

  return (
    <ChatContext.Provider value={chat}>
      <div className="flex flex-col h-screen">
        <ChatRoomHeader />
        <ChatContainer />
        <ChatForm />
      </div>
    </ChatContext.Provider>
  );
}
