import Button from "@/components/common/button";
import { cn } from "@/lib/utils/tailwind.utils";
import {
  SendMemberReservationMessage,
  SendMemberReservationMessageContent,
} from "@/types/api.type";

export default function MemberReservationMessage({
  message,
}: {
  message: SendMemberReservationMessage;
}) {
  const reservation = JSON.parse(
    message.content,
  ) as SendMemberReservationMessageContent;
  return (
    <div className={cn("py-3 px-3 rounded-2xl max-w-40 bg-sky-500 text-white")}>
      <div>
        <p>견적서 요청이 왔습니다 프로그램: {reservation.programName}</p>
        <p> 가격: {reservation.price}</p>
        <p>위치: {reservation.address}</p>
      </div>
      <Button>확인</Button>
    </div>
  );
}
