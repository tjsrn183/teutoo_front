import Image from "next/image";
import userThumb from "@/public/trainerMyPageIcons/userThumb.png";

interface ScheduleAtomProps {
  day?: number;
  time?: string;
  name?: string;
  picture?: string;
  date: string;
}
export default function ScheduleAtom({
  day,
  time,
  name,

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
      <div className="grow"></div>

      <div className="bg-white text-[#36393E] flex items-center rounded-[12px] p-2 font-semibold w-[240px] drop-shadow-2xl h-[60px]">
        <div className=" w-[25%] break-words">{time}</div>
        <div className=" w-[50%] flex justify-center">{name}</div>

        <Image
          src={userThumb}
          alt="userThumb"
          width={47}
          height={47}
          className=" w-[25%]"
        />
      </div>
    </div>
  );
}
