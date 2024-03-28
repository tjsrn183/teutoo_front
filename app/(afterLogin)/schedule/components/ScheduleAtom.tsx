import Image from "next/image";
import userThumb from "@/public/trainerMyPageIcons/userThumb.png";
import { formatDate } from "../utils/formatDate";

interface ScheduleAtomProps {
  name: string;
  startDateTime: string;
  endDateTime: string;
  image: string;
  hidden?: boolean;
}
export default function ScheduleAtom({
  name,
  startDateTime,
  endDateTime,
  image,
  hidden = false,
}: ScheduleAtomProps) {
  if (hidden) return null;

  return (
    <div className="flex justify-around my-2 items-center">
      <div className="grow"></div>
      <div className="bg-white text-[#36393E] flex items-center rounded-[12px] p-2 font-semibold w-[240px] drop-shadow-2xl h-[60px]">
        <div className=" w-[25%] break-words">
          {formatDate(startDateTime)[1]}~{formatDate(endDateTime)[1]}
        </div>
        <div className=" w-[50%] flex justify-center">{name}</div>
        {image ? (
          <Image
            src={image}
            alt="img"
            width={47}
            height={47}
            className=" w-[25%]"
          />
        ) : (
          <Image
            src={userThumb}
            alt="userThumb"
            width={47}
            height={47}
            className=" w-[25%]"
          />
        )}
      </div>
    </div>
  );
}
