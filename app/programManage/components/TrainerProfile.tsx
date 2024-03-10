"use client";
import Image from "next/image";
import userThumb from "@/public/trainerMyPageIcons/userThumb.png";
import { useQueryClient } from "@tanstack/react-query";
import { UserDataType } from "@/app/trainerMyPage/components/MyInfoChunk";
export default function TrainerProfile() {
  const queryClient = useQueryClient();

  const data: UserDataType | undefined = queryClient.getQueryData(["userData"]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex relative w-[80px] rounded-[100%] overflow-hidden mr-2 h-[80px]">
        {data?.data.profileImagePath ? (
          <Image
            src={data.data.profileImagePath}
            alt="profileImage"
            layout="fill"
            objectFit="contain"
          ></Image>
        ) : (
          <Image src={userThumb} alt="userThumb"></Image>
        )}
      </div>

      <div className="text-black text-xl">안녕하세요 트레이너님!</div>
    </div>
  );
}
