import Image from "next/image";
import userThumb from "@/public/trainerMyPageIcons/userThumb.png";
import DayContourLine from "./DayContourLine";

interface ScheduleAtomProps {
  day?: number;
  time?: string;
  name?: string;
  picture?: string;
  hidden?: boolean;
  date: string;
}
export default function ScheduleAtom({
  day,
  time,
  name,
  hidden,
  date,
}: ScheduleAtomProps) {
  const dateObj = new Date();
  const koreanMonth = dateObj.toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const scheduleDate = new Date(date).toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  let compare = scheduleDate === koreanMonth;

  return (
    <div className="flex justify-around my-2 items-center">
      {!hidden && (
        <div
          className={`${
            compare ? `bg-[#22C55E]` : `bg-white`
          } w-9 h-9 flex items-center justify-center rounded-full ${
            compare ? `text-white` : `text-[#22C55E]`
          } `}
        >
          {day}
        </div>
      )}
      <div className="grow"></div>

      <div className="bg-[#22C55E] text-white flex items-center justify-center rounded-[12px] p-2 font-semibold w-[240px]">
        {time} {name}
        <Image
          src={userThumb}
          alt="userThumb"
          width={47}
          height={47}
          className="pl-3"
        />
      </div>
    </div>
  );
}
