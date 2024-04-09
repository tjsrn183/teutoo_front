import { generateTimeList } from "@/lib/utils";
import { cn } from "@/lib/utils/tailwind.utils";
import React from "react";

interface TimePickerProps {
  onSelect: (time: string) => void;
  selected: string;
  startTime?: string;
  endTime?: string;
}

export default function TimePicker({
  onSelect,
  selected,
  startTime = "06:00",
  endTime = "23:30",
}: TimePickerProps): JSX.Element {
  const TIMES = generateTimeList(startTime, endTime);

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
