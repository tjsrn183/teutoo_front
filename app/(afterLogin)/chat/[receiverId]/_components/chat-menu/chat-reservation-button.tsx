import { CalendarCheck, X } from "lucide-react";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import TimePicker from "./time-picker";
import AppBar from "@/components/common/app-bar";
import Button from "@/components/common/button";
import Calendar from "@/components/common/calendar";
import ChatReservationView from "@/app/(afterLogin)/chat/[receiverId]/_components/chat-menu/chat-reservation-view";
import { PostReservationRequest } from "@/api/postReservation";
import { ErrorBoundary } from "react-error-boundary";

interface ChatReservationButtonProps {}

export default function ChatReservationButton({}: ChatReservationButtonProps): JSX.Element {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          aria-label="예약 하기"
          className="flex flex-col items-center justify-center rounded hover:bg-neutral-100"
          type="button"
        >
          <CalendarCheck />
          <span>예약</span>
        </button>
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
            <AppBar.Title>PT 예약하기</AppBar.Title>
          </AppBar>
          <Dialog.Description className="sr-only" hidden>
            PT를 예약합니다.
          </Dialog.Description>
          <ErrorBoundary fallback={<div>예약할 수 없습니다</div>}>
            <ChatReservationView onClose={() => setOpen(false)} />
          </ErrorBoundary>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
