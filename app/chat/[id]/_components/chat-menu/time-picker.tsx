import { cn } from "@/lib/utils/tailwind.utils";
import React from "react";

const TIMES = [
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
];

interface TimePickerProps {
  onSelect: (time: string) => void;
  selected: string;
}

export default function TimePicker({
  onSelect,
  selected,
}: TimePickerProps): JSX.Element {
  return (
    <div>
      <div className="grid grid-cols-4 gap-2">
        {TIMES.map((time) => (
          <button
            className={cn(
              "p-2 text-center rounded bg-white border border-neutral-200 hover:bg-neutral-100",
              selected === time && "bg-green-500 hover:bg-green-600 text-white",
            )}
            key={time}
            onClick={() => onSelect(time)}
            type="button"
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
}
