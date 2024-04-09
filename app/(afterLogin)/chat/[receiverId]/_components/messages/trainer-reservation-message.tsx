import Button from "@/components/common/button";
import { cn } from "@/lib/utils/tailwind.utils";
import {
  SendTrainerReservationMessage,
  SendTrainerReservationMessageContent,
} from "@/types/api.type";

export default function TrainerReservationMessage({
  message,
}: {
  message: SendTrainerReservationMessage;
}) {
  const reservation = JSON.parse(
    message.content,
  ) as SendTrainerReservationMessageContent;
  return (
    <div className={cn("py-3 px-3 rounded-2xl max-w-40 bg-sky-500 text-white")}>
      <div>
        <p>트레이너로 부터 견적서 요청이 왔습니다</p>
        <p>가격: {reservation.price}</p>
        <p>위치: {reservation.address}</p>
      </div>
      <Button>확인</Button>
    </div>
  );
}
