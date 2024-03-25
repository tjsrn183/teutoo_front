"use client";

import { locationStore } from "@/store/locationStore";
import { useEditInfo } from "../api/useEditInfo";
import { FormEventHandler, useState } from "react";
import ButtonBundle from "./ButtonBuntle";
import Picture from "./Picture";
import JoinInputField from "@/app/join/components/JoinInputFiled";
import EditTextField from "./EditTextField";

export interface EditFormData {
  address: string;
  profileImage: File | null | undefined;
}

export default function EditInfoPage() {
  const mutation = useEditInfo();
  const [clickSubmit, setClickSubmit] = useState<boolean>(false);
  const [imgTarget, setImageTarget] = useState<File | null>();
  const [selectedImage, setSelectedImage] = useState<string>();
  const [pw, setPw] = useState<string>("");
  const { location, setLocation } = locationStore();
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setClickSubmit(true);
    if (location) {
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
    }
  };

  return (
    <div className="bg-white w-full">
      <form onSubmit={onSubmit} className="flex flex-col px-4 ">
        <Picture
          selectedImage={selectedImage}
          setImageTarget={setImageTarget}
          setSelectedImage={setSelectedImage}
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

        <ButtonBundle />
      </form>
    </div>
  );
}
/*
<JoinInputField
          title="새로운 비밀번호"
          placeholder="새로운 비밀번호를 입력하세요."
        />
        <label className="text-[#323232] flex flex-col font-bold my-1">
          주소
          <input
            type="text"
            placeholder="주소를 입력하세요"
            className="bg-[#e4e6e7] rounded-[6px] py-2 font-normal"
            value={location}
            disabled
          />
        </label>


*/
