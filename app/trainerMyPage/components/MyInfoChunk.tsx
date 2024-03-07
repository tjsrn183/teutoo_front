"use client";
import Image from "next/image";
import userThumb from "@/public/trainerMyPageIcons/userThumb.png";
import logout from "@/public/trainerMyPageIcons/logoutButton.png";
import infoEditButton from "@/public/trainerMyPageIcons/infoEditButton.png";
import { useQuery } from "@tanstack/react-query";
import { fetchUserData } from "../page";

export default function MyInfoChunk() {
  const { data } = useQuery({ queryKey: ["userData"], queryFn: fetchUserData });

  return (
    <div className=" flex">
      <div className="flex">
        <Image src={userThumb} alt="userThumb"></Image>
      </div>
      <div className="flex flex-col w-full">
        <div className=" flex justify-between items-center">
          <div className=" text-black text-[20px] font-bold flex items-center">
            {data?.data.name}
            <button type="button">
              <Image src={infoEditButton} alt="infoEditButton" />
            </button>
          </div>

          <button className=" bg-[#22C55E] rounded-[12px] w-[40px] h-[40px] flex justify-center items-center">
            <Image src={logout} alt="logout" />
          </button>
        </div>
        <div className="text-[17px] text-slate-400">gymgym12@naver.com</div>
      </div>
    </div>
  );
}
