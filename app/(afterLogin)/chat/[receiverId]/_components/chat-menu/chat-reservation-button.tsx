import { CalendarCheck, X } from "lucide-react";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import TimePicker from "./time-picker";
import AppBar from "@/components/common/app-bar";
import Button from "@/components/common/button";
import Calendar from "@/components/common/calendar";

export default function ChatReservationButton(): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date(),
  );
  const [selectedTime, setSelectedTime] = React.useState<string>("");

  const onClick = () => {
    console.log(selectedDate, selectedTime);
  };

  const isComplete = Boolean(selectedDate) && Boolean(selectedTime);
  console.log(isComplete);
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
        <Dialog.Content className="w-full h-full max-w-md bg-white top-0 fixed left-1/2 -translate-x-1/2 flex flex-col z-20">
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
          <div className="overflow-y-auto flex-auto p-4">
            <h2 className="text-xl font-semibold my-4">프로그램 선택</h2>

            <h2 className="text-xl font-semibold my-4">날짜 선택</h2>
            <Calendar
              mode="single"
              onSelect={setSelectedDate}
              selected={selectedDate}
            />

            <h2 className="text-xl font-semibold my-4">시간 선택</h2>
            <TimePicker onSelect={setSelectedTime} selected={selectedTime} />
          </div>
          <div className="p-4">
            <Button
              type="button"
              className="w-full"
              disabled={!isComplete}
              onClick={onClick}
            >
              예약하기
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
