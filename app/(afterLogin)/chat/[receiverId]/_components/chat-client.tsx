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
  const {
    sendTextMessage,
    roomInfo,
    messages,
    requestReservation,
    sendImageMessage,
  } = useChatRoom({
    receiverId,
  });
  const { data: userInfo } = useLoginUserInfoQuery();

  if (!roomInfo) return <div>loading...</div>;

  return (
    <div className="flex flex-col h-screen">
      <ChatRoomHeader />
      <ChatContainer>
        <div className="flex justify-center">
          <SystemMessage message="Welcome to the chat" />
        </div>
        {messages.map((message, i) => {
          const isNewDay =
            new Date(message.createdAt).toLocaleDateString() !==
            new Date(messages[i - 1]?.createdAt).toLocaleDateString();
          return (
            <>
              {isNewDay && <DateMessage date={message.createdAt} />}
              <UserMessage
                key={message.msgIdx}
                isMe={message.senderId === userInfo.data.memberId}
                content={message.content}
                time={message.createdAt}
                type={message.contentType}
                isRead={
                  message.senderId === userInfo.data.memberId
                    ? roomInfo.receiverIdx >= message.msgIdx
                    : roomInfo.senderIdx >= message.msgIdx
                }
              />
            </>
          );
        })}
      </ChatContainer>
      <ChatForm
        onSendTextMessage={sendTextMessage}
        onSendImageMessage={sendImageMessage}
        receiverId={receiverId}
        requestReservation={requestReservation}
      />
    </div>
  );
}
