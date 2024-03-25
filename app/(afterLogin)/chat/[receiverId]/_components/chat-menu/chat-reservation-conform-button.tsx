import { CalendarCheck, X } from "lucide-react";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import TimePicker from "./time-picker";
import AppBar from "@/components/common/app-bar";
import Button from "@/components/common/button";
import Calendar from "@/components/common/calendar";
import ChatReservationView from "@/app/(afterLogin)/chat/[receiverId]/_components/chat-menu/chat-reservation-view";
import { PostReservationRequest } from "@/api/postReservation";
import { ReservationMessageContent } from "@/types/api.type";
import postReservationAccept from "@/api/postReservationAccept";
import { useLoginUserInfoQuery } from "@/api/getLoginUserInfo";
import { dateToLocalString } from "@/lib/utils";

interface ChatReservationConfirmButtonProps {
  reservationInfo: ReservationMessageContent;
}

export default function ChatReservationConfirmButton({
  reservationInfo,
}: ChatReservationConfirmButtonProps): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const user = useLoginUserInfoQuery();

  const isTrainer = user.data.data.memberId === reservationInfo.trainerId;
  const handleReservationConfirm = async () => {
    try {
      if (!isTrainer) return;
      const res = await postReservationAccept({
        reservationId: reservationInfo.reservationId,
      });
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
                <p>{reservationInfo.programName}</p>
              </div>
              <div className="flex gap-2">
                <h2 className="text-lg font-semibold">예약자 성명</h2>
                <p>{reservationInfo.memberName}</p>
              </div>
              <div className="flex gap-2">
                <h2 className="text-lg font-semibold">예약 시간</h2>
                <p>
                  {dateToLocalString(reservationInfo.startDateTime)} ~{" "}
                  {dateToLocalString(reservationInfo.endDateTime)}
                </p>
              </div>
            </div>
          </div>
          {reservationInfo.status === "PENDING" ? (
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
