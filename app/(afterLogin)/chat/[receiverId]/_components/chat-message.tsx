import ChatReservationConfirmButton from "@/app/(afterLogin)/chat/[receiverId]/_components/chat-menu/chat-reservation-conform-button";
import Button from "@/components/common/button";
import { cn } from "@/lib/utils/tailwind.utils";
import { ReservationMessageContent, SendMessage } from "@/types/api.type";

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

export function SystemMessage({ message }: { message: string }): JSX.Element {
  return <p className="text-sm text-neutral-500 p-1">{message}</p>;
}

export function UserMessage({
  content,
  time,
  isMe,
  isRead,
  type,
}: {
  content: string;
  time: string;
  isMe: boolean;
  isRead: boolean;
  type: SendMessage["contentType"];
}): JSX.Element {
  return (
    <div className={cn(isMe ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "flex gap-1 items-end",
          isMe ? "flex-row-reverse" : "flex-row",
        )}
      >
        {type === "TEXT" ? (
          <TextMessage content={content} isMe={isMe} />
        ) : type === "RESERVATION" ? (
          <ReservationMessage content={content} isMe={isMe} />
        ) : type === "IMG" ? (
          <ImageMessage url={content} isMe={isMe} />
        ) : null}
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
            {getChatTime(time)}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ReservationMessage({
  content,
  isMe,
}: {
  content: string;
  isMe: boolean;
}) {
  const reservation = JSON.parse(content) as ReservationMessageContent;
  return (
    <div className={cn("py-3 px-3 rounded-2xl max-w-40 bg-sky-500 text-white")}>
      <p>
        {reservation.memberName}님이 &quot;{reservation.programName}&quot;
        프로그램을 예약했습니다.
      </p>
      <ChatReservationConfirmButton reservationInfo={reservation} />
    </div>
  );
}

export function TextMessage({
  content,
  isMe,
}: {
  content: string;
  isMe: boolean;
}) {
  return (
    <div
      className={cn(
        "py-2 px-3 rounded-2xl",
        isMe ? "bg-green-500 text-white" : "bg-neutral-300",
      )}
    >
      {content}
    </div>
  );
}

export function ImageMessage({ url, isMe }: { url: string; isMe: boolean }) {
  return (
    <div
      className={cn(
        "py-2 px-3 rounded-2xl",
        isMe ? "bg-green-500 text-white" : "bg-neutral-300",
      )}
    >
      <img src={url} alt="chat image" className="w-40 h-full" />
    </div>
  );
}

// export default function ChatMessage({
//   message,
//   type,
//   time,
//   isMe,
// }: {
//   message: string;
//   type: string;
//   time: string;
//   isMe: boolean;
// }): JSX.Element {
//   if (type === "date") {
//     return <DateMessage date={message} />;
//   }
//   if (type === "system") {
//     return <SystemMessage message={message} />;
//   }
//   return <UserMessage isMe={isMe} message={message} time={time} />;
// }
