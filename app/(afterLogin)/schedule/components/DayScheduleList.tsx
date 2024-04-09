"use client";
import { useDateStore } from "@/store/useDateStore";
import ScheduleAtom from "./ScheduleAtom";
import dayjs from "dayjs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDate } from "../utils/formatDate";
import { getScheduleT } from "../api/getScheduleT";

interface ScheduleItem {
  memberId: number;
  memberName: string;
  imgResDto: {
    imgName: string;
    imgUrl: string;
  };
  startDateTime: string;
  endDateTime: string;
}
export default function DayScheduleList() {
  const { data }: { data: Array<ScheduleItem> | undefined } = useQuery({
    queryKey: ["scheduleT"],
    queryFn: getScheduleT,
  });

  const { date } = useDateStore();

  return (
    <div className=" w-full bg-white mt-6 rounded-2xl p-4 flex flex-col items-center mb-4">
      <span className=" flex justify-start w-full text-[#36393E] font-bold ml-6">
        {date instanceof Date && dayjs(date).format("YYYY년 MM월 DD일")}
      </span>
      {data?.map((item, index) => (
        <ScheduleAtom
          key={index}
          startDateTime={item.startDateTime}
          endDateTime={item.endDateTime}
          image={item.imgResDto.imgUrl}
          name={item.memberName}
          hidden={
            formatDate(item.startDateTime)[0] !==
            (date instanceof Date && dayjs(date).format("YYYY-MM-DD"))
          }
        />
      ))}
    </div>
  );
}
