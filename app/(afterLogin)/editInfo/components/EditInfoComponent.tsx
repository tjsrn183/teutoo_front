"use client";

import { locationStore } from "@/store/locationStore";
import { useEditInfo } from "../api/useEditInfo";
import { FormEventHandler, useState } from "react";
import ButtonBundle from "./ButtonBuntle";
import EditTextField from "./EditTextField";
import ProfileImg from "../../kakaoJoin/components/ProfileImg";
import { useQuery } from "@tanstack/react-query";
import { getUserData } from "@/app/(afterLogin)/myPage/api/getUserData";
import { UserDataType } from "@/app/(afterLogin)/myPage/@trainerMyPage/components/MyInfoChunk";
export interface EditFormData {
  address: string;
  profileImage: File | null | undefined;
}

export default function EditInfoPage() {
  const mutation = useEditInfo();
  const { data }: { data: UserDataType | undefined } = useQuery({
    queryKey: ["userData"],
    queryFn: getUserData,
  });

  const [imgTarget, setImageTarget] = useState<File | null>();
  const [selectedImage, setSelectedImage] = useState<string>();

  const [pw, setPw] = useState<string>("");
  const { location, setLocation } = locationStore();
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (location && pw) {
      const formdata = new FormData();
      formdata.append("address", location);

      if (pw) {
        formdata.append("password", pw);
      } else {
        alert("비밀번호를 입력하세요");
      }

      if (imgTarget) {
        formdata.append("profileImage", imgTarget);
      }
      mutation.mutate(formdata);
    } else {
      alert("주소와 비밀번호를 입력하세요");
    }
  };

  return (
    <div className="bg-white w-full">
      <form onSubmit={onSubmit} className="flex flex-col px-4 ">
        <ProfileImg
          selectedImage={selectedImage}
          setImageTarget={setImageTarget}
          setSelectedImage={setSelectedImage}
          imageFromServer={data?.data.profileImagePath}
        />
        <EditTextField
          title="새로운 비밀번호"
          placeholder="새로운 비밀번호를 입력하세요."
          state={pw}
          setState={setPw}
        />
        <EditTextField
          title="새로운 주소"
          placeholder="새로운 주소를 입력하세요."
          state={location}
          setState={setLocation}
          disabled
        />
        <div></div>
        <ButtonBundle />
      </form>
    </div>
  );
}
