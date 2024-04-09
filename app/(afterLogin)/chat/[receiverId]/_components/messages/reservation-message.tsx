import ChatReservationConfirmButton from "@/app/(afterLogin)/chat/[receiverId]/_components/chat-menu/chat-reservation-conform-button";
import { cn } from "@/lib/utils/tailwind.utils";
import {
  SendReservationMessage,
  SendReservationMessageContent,
} from "@/types/api.type";

export default function ReservationMessage({
  message,
}: {
  message: SendReservationMessage;
}) {
  const reservation = JSON.parse(
    message.content,
  ) as SendReservationMessageContent;
  return (
    <div className={cn("py-3 px-3 rounded-2xl max-w-40 bg-sky-500 text-white")}>
      <p>
        {reservation.memberName}님이 &quot;{reservation.programName}&quot;
        프로그램을 예약했습니다.
      </p>
      <ChatReservationConfirmButton message={message} />
    </div>
  );
}
