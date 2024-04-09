import { X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import AppBar from "@/components/common/app-bar";
import Button from "@/components/common/button";
import postReservationAccept from "@/api/postReservationAccept";
import { useLoginUserInfoQuery } from "@/api/getLoginUserInfo";
import { dateToLocalString } from "@/lib/utils";
import { useState } from "react";
import {
  SendReservationMessage,
  SendReservationMessageContent,
} from "@/types/api.type";
import { useChatContext } from "@/app/(afterLogin)/chat/[receiverId]/_components/chat-client";

interface ChatReservationConfirmButtonProps {
  message: SendReservationMessage;
}

export default function ChatReservationConfirmButton({
  message,
}: ChatReservationConfirmButtonProps): JSX.Element {
  const reservationContent = JSON.parse(
    message.content,
  ) as SendReservationMessageContent;
  const { sendAcceptReservationMessage } = useChatContext();
  const [open, setOpen] = useState(false);
  const user = useLoginUserInfoQuery();

  const isTrainer = user.data.data.memberId === reservationContent.trainerId;

  const handleReservationConfirm = async () => {
    try {
      if (!isTrainer) return;
      await sendAcceptReservationMessage(message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button
          aria-label="예약 정보 확인하기"
          variant="default"
          type="button"
          className="w-full"
        >
          예약 확인
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-neutral-950 opacity-50 fixed w-full h-full left-0 top-0" />
        <Dialog.Content className="w-full h-full md:max-w-md bg-white top-0 fixed left-1/2 -translate-x-1/2 flex flex-col z-20">
          <AppBar sticky>
            <Dialog.Close asChild>
              <Button size="icon" variant="ghost">
                <X />
              </Button>
            </Dialog.Close>
            <AppBar.Title>예약 정보</AppBar.Title>
          </AppBar>
          <Dialog.Description className="sr-only" hidden>
            PT 예약 정보
          </Dialog.Description>
          <div className="overflow-y-auto flex-auto p-4">
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <h2 className="text-lg font-semibold">프로그램명</h2>
                <p>{reservationContent.programName}</p>
              </div>
              <div className="flex gap-2">
                <h2 className="text-lg font-semibold">예약자 성명</h2>
                <p>{reservationContent.memberName}</p>
              </div>
              <div className="flex gap-2">
                <h2 className="text-lg font-semibold">예약 시간</h2>
                <p>
                  {dateToLocalString(reservationContent.startDateTime)} ~{" "}
                  {dateToLocalString(reservationContent.endDateTime)}
                </p>
              </div>
              <div className="flex gap-2">
                <h2 className="text-lg font-semibold">예약 상태</h2>
                <p>
                  {reservationContent.status === "PENDING"
                    ? "대기 중"
                    : reservationContent.status === "RESERVED"
                    ? "예약 완료"
                    : "예약 취소"}
                </p>
              </div>
            </div>
          </div>
          {isTrainer && reservationContent.status === "PENDING" ? (
            <div className="p-4">
              <Button
                type="button"
                className="w-full"
                onClick={handleReservationConfirm}
                disabled={!isTrainer}
              >
                예약 수락하기
              </Button>
            </div>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
