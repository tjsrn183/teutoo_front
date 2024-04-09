import Button from "@/components/common/button";
import { cn } from "@/lib/utils/tailwind.utils";
import {
  SendReservationAcceptMessage,
  SendReservationMessageContent,
} from "@/types/api.type";

export default function ReservationAcceptMessage({
  message,
}: {
  message: SendReservationAcceptMessage;
}) {
  const reservation = JSON.parse(
    message.content,
  ) as SendReservationMessageContent;
  return (
    <div className={cn("py-3 px-3 rounded-2xl max-w-40 bg-sky-500 text-white")}>
      <p>
        {reservation.memberName}님이 &quot;{reservation.programName}&quot;
        프로그램 예약을 수락했습니다.
      </p>
      <Button>확인</Button>
    </div>
  );
}
