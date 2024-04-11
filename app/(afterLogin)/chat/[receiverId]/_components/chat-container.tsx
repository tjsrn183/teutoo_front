import { useLoginUserInfoQuery } from "@/api/getLoginUserInfo";
import { useChatContext } from "@/app/(afterLogin)/chat/[receiverId]/_components/chat-client";
import {
  DateMessage,
  UserMessage,
} from "@/app/(afterLogin)/chat/[receiverId]/_components/chat-message";
import { Fragment, useEffect, useRef } from "react";
interface ChatContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function ChatContainer({
  ...props
}: ChatContainerProps): JSX.Element {
  const { messages } = useChatContext();
  const { data: userInfo } = useLoginUserInfoQuery();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollBottom = () => {
      if (!containerRef.current) return;
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    };
    scrollBottom();
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col bg-white h-full w-full p-4 gap-4 overflow-y-auto"
      {...props}
    >
      {messages.map((message, i) => {
        const isNewDay =
          new Date(message.createdAt).toLocaleDateString() !==
          new Date(messages[i - 1]?.createdAt).toLocaleDateString();
        return (
          <Fragment key={message.msgIdx}>
            {isNewDay && <DateMessage date={message.createdAt} />}
            <UserMessage message={message} userId={userInfo.data.memberId} />
          </Fragment>
        );
      })}
    </div>
  );
}
