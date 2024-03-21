"use client";
import { useLoginUserInfoQuery } from "@/api/getLoginUserInfo";
import ChatContainer from "@/app/(afterLogin)/chat/[receiverId]/_components/chat-container";
import ChatForm from "@/app/(afterLogin)/chat/[receiverId]/_components/chat-form";
import {
  DateMessage,
  SystemMessage,
  UserMessage,
} from "@/app/(afterLogin)/chat/[receiverId]/_components/chat-message";
import ChatRoomHeader from "@/app/(afterLogin)/chat/[receiverId]/_components/chatroom-header";
import useChatRoom from "@/lib/hooks/useChatRoom";
import React from "react";

interface ChatClientProps {
  receiverId: number;
}

export default function ChatClient({
  receiverId,
}: ChatClientProps): JSX.Element {
  const { sendTextMessage, roomInfo, messages } = useChatRoom({
    receiverId,
  });
  const { data: userInfo } = useLoginUserInfoQuery();

  if (!roomInfo) return <div>loading...</div>;

  return (
    <div className="flex flex-col h-screen">
      <ChatRoomHeader />
      <ChatContainer>
        <div className="flex justify-center">
          <DateMessage date="2021-08-01" />
        </div>
        <div className="flex justify-center">
          <SystemMessage message="Welcome to the chat" />
        </div>
        {messages.map((message) => (
          <UserMessage
            key={message.msgIdx}
            isMe={message.senderId === userInfo.data.memberId}
            message={message.content}
            time={message.createdAt}
            isRead={
              message.senderId === userInfo.data.memberId
                ? roomInfo.receiverIdx >= message.msgIdx
                : roomInfo.senderIdx >= message.msgIdx
            }
          />
        ))}
      </ChatContainer>
      <ChatForm onSendTextMessage={sendTextMessage} />
    </div>
  );
}
