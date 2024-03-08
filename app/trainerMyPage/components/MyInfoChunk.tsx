"use client";
import Image from "next/image";
import userThumb from "@/public/trainerMyPageIcons/userThumb.png";
import logout from "@/public/trainerMyPageIcons/logoutButton.png";
import infoEditButton from "@/public/trainerMyPageIcons/infoEditButton.png";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface UserDataType {
  data: {
    name: string;
    address: string;
    email?: string;
    profileImagePath?: string;
  };
}
export default function MyInfoChunk() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const data: UserDataType | undefined = queryClient.getQueryData(["userData"]);

  const onClickEditInfo = () => {
    router.push("/editInfo");
  };
  return (
    <div className=" flex">
      <div className="flex relative w-[100px] rounded-[100%] overflow-hidden">
        {data?.data.profileImagePath ? (
          <div className=" ">
            <Image
              src={data.data.profileImagePath}
              alt="profileImage"
              layout="fill"
              objectFit="cover"
            ></Image>
          </div>
        ) : (
          <Image src={userThumb} alt="userThumb"></Image>
        )}
      </div>
      <div className="flex flex-col w-full">
        <div className=" flex justify-between items-center">
          <div className=" text-black text-[20px] font-bold flex items-center">
            {data?.data.name}
            <button type="button" onClick={onClickEditInfo}>
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
