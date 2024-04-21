"use client";
import { useLoginUserInfoQuery } from "@/api/getLoginUserInfo";
import Avatar from "@/components/common/avatar";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { deleteCookie, getCookie } from "cookies-next";
import logout from "@/public/trainerMyPageIcons/logoutButton.png";
export default function AccountInfo(): JSX.Element {
  const { data: queryData } = useLoginUserInfoQuery();
  const { data } = queryData;
  const onClickLogout = () => {
    deleteCookie("token");
    location.reload();
  };
  return (
    <div className=" flex justify-between">
      <Link className="flex items-center gap-4 mt-4 p-4" href="/editInfo">
        <Avatar>
          <Avatar.Image
            alt="avatar"
            src={data.profileImagePath || "/blank-profile.webp"}
          />
          <Avatar.Fallback>avatar</Avatar.Fallback>
        </Avatar>
        <div>
          <div className="flex items-center">
            <h2 className="font-medium text-lg">{data.name}</h2>
            <ChevronRight />
          </div>
          <p className="text-neutral-400">{data.email}</p>
        </div>
      </Link>
      <div className=" flex flex-col justify-center mr-5">
        <button
          onClick={onClickLogout}
          className=" bg-[#22C55E] rounded-[12px] w-[40px] h-[40px] flex justify-center items-center active:bg-[#90dfad]"
        >
          <Image src={logout} alt="logout" />
        </button>
      </div>
    </div>
  );
}
