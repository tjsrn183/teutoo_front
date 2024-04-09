import { useChatContext } from "@/app/(afterLogin)/chat/[receiverId]/_components/chat-client";
import ImageMessage from "@/app/(afterLogin)/chat/[receiverId]/_components/messages/image-message";
import MemberReservationMessage from "@/app/(afterLogin)/chat/[receiverId]/_components/messages/member-reservation-message";
import ReservationAcceptMessage from "@/app/(afterLogin)/chat/[receiverId]/_components/messages/reservation-accept-message";
import ReservationMessage from "@/app/(afterLogin)/chat/[receiverId]/_components/messages/reservation-message";
import TextMessage from "@/app/(afterLogin)/chat/[receiverId]/_components/messages/text-message";
import TrainerReservationMessage from "@/app/(afterLogin)/chat/[receiverId]/_components/messages/trainer-reservation-message";
import { cn } from "@/lib/utils/tailwind.utils";

import { SendMessage } from "@/types/api.type";

/**
 *
 * @param date  - date string
 * @returns   - time string
 * @example getChatTime('2021-08-01T12:00:00') // 12:00
 */
function getChatTime(date: string): string {
  return new Date(date).toTimeString().slice(0, 5);
}

export function DateMessage({ date }: { date: string }): JSX.Element {
  return (
    <div className="flex justify-center">
      <span className="text-sm text-white bg-neutral-400/60 px-2 py-1 rounded-full w-fit">
        {new Date(date).toLocaleDateString()}
      </span>
    </div>
  );
}

const getMessageComponent = (message: SendMessage, isMe: boolean) => {
  switch (message.contentType) {
    case "TEXT":
      return <TextMessage message={message} isMe={isMe} />;
    case "IMG":
      return <ImageMessage message={message} isMe={isMe} />;
    case "RESERVATION":
      return <ReservationMessage message={message} />;
    case "RESERVATION_ACCEPT":
      return <ReservationAcceptMessage message={message} />;
    case "RESERVATION_REQ_MEMBER":
      return <MemberReservationMessage message={message} />;
    case "RESERVATION_REQ_TRAINER":
      return <TrainerReservationMessage message={message} />;
    default:
      return null;
  }
};

export function UserMessage({
  message,
  userId,
}: {
  message: SendMessage;
  userId: number;
}): JSX.Element {
  const { messageIndex } = useChatContext();
  const isMe = message.senderId === userId;
  const { contentType, content, createdAt } = message;
  const isRead = messageIndex.sender >= message.msgIdx;

  return (
    <div className={cn(isMe ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "flex gap-1 items-end",
          isMe ? "flex-row-reverse" : "flex-row",
        )}
      >
        {getMessageComponent(message, isMe)}
        <div
          className={cn(
            "flex flex-col gap-1",
            isMe ? "text-right" : "text-left",
          )}
        >
          {isRead ? (
            <div className="text-sm leading-none text-green-600 font-medium">
              읽음
            </div>
          ) : (
            <div className="text-sm leading-none text-neutral-600 font-medium">
              보냄
            </div>
          )}

          <div className="text-sm leading-none text-neutral-500">
            {getChatTime(createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
}
