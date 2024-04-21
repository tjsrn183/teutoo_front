import React from "react";
import TimePicker from "./time-picker";
import Button from "@/components/common/button";
import Calendar from "@/components/common/calendar";
import { useTrainerInfoQuery } from "@/api/getTrainerInfo";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/select";
import { PostReservationRequest } from "@/api/postReservation";
import { getEndTime, returnISOString } from "@/lib/utils";
import { useChatContext } from "@/app/(afterLogin)/chat/[receiverId]/_components/chat-client";

interface ChatReservationViewProps {
  onClose: () => void;
}

export default function ChatReservationView({
  onClose,
}: ChatReservationViewProps): JSX.Element {
  const { receiverId, sendRequestReservationMessage } = useChatContext();
  const [selectedProgram, setSelectedProgram] = React.useState<string>("");
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = React.useState<string>("");
  const {
    data: { ptProgramResDtoList },
  } = useTrainerInfoQuery({
    trainerId: receiverId,
  });

  const onClick = () => {
    if (!selectedDate || !selectedTime) return;
    const startTime = returnISOString(selectedDate, selectedTime);
    const endTime = returnISOString(selectedDate, getEndTime(selectedTime, 30));
    sendRequestReservationMessage({
      programId: parseInt(selectedProgram),
      startTime,
      endTime,
    });
    onClose();
  };

  const isComplete = Boolean(selectedDate) && Boolean(selectedTime);

  const startTime =
    ptProgramResDtoList.find(
      (program) => program.ptProgramId.toString() === selectedProgram,
    )?.availableStartTime ?? undefined;

  const endTime =
    ptProgramResDtoList.find(
      (program) => program.ptProgramId.toString() === selectedProgram,
    )?.availableEndTime ?? undefined;

  return (
    <>
      <div className="overflow-y-auto flex-auto p-4">
        <h2 className="text-xl font-semibold my-4">프로그램 선택</h2>
        <Select onValueChange={setSelectedProgram}>
          <SelectTrigger className="">
            <SelectValue placeholder="프로그램 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {ptProgramResDtoList.map((program) => (
                <SelectItem
                  key={program.ptProgramId}
                  value={program.ptProgramId.toString()}
                >
                  {program.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <h2 className="text-xl font-semibold my-4">날짜 선택</h2>
        <Calendar
          mode="single"
          onSelect={setSelectedDate}
          selected={selectedDate}
          disabled={selectedProgram === ""}
        />

        <h2 className="text-xl font-semibold my-4">시간 선택</h2>
        <TimePicker
          onSelect={setSelectedTime}
          selected={selectedTime}
          startTime={startTime}
          endTime={endTime}
        />
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
    </>
  );
}
