import React from "react";
import ChatRoomHeader from "./_components/chatroom-header";
import ChatContainer from "./_components/chat-container";
import {
  DateMessage,
  SystemMessage,
  UserMessage,
} from "./_components/chat-message";
import ChatForm from "./_components/chat-form";

interface ChatRoomPageProps {
  params: {
    id: string;
  };
}

export default function ChatRoomPage({
  params: { id },
}: ChatRoomPageProps): JSX.Element {
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
        <div className="flex justify-end">
          <UserMessage
            isMe
            message="LoremExercitation cupidatat nulla Lorem irure cillum mollit esse officia qui fugiat non velit ullamco."
            time="2021-08-01T12:00:00"
          />
        </div>
        {Array.from({ length: 20 }).map((_, i) => (
          <div className="flex justify-start" key={i}>
            <UserMessage message={`hello ${i}`} time="2021-08-01T12:00:00" />
          </div>
        ))}
      </ChatContainer>
      <ChatForm />
    </div>
  );
}
