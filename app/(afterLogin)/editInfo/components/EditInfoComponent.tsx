"use client";

import { useRouter } from "next/navigation";
import { locationStore } from "@/store/locationStore";
import { useEditInfo } from "../api/useEditInfo";
import { FormEventHandler, useState } from "react";
import ButtonBundle from "./ButtonBuntle";
import Picture from "./Picture";

export interface EditFormData {
  address: string;
  profileImage: File | null | undefined;
}

export default function EditInfoPage() {
  const mutation = useEditInfo();
  const [clickSubmit, setClickSubmit] = useState<boolean>(false);
  const [imgTarget, setImageTarget] = useState<File | null>();
  const [selectedImage, setSelectedImage] = useState<string>();
  const { location, setLocation } = locationStore();
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setClickSubmit(true);
    if (location) {
      const formdata = new FormData();
      formdata.append("address", location);
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
        <ButtonBundle />
      </form>
    </div>
  );
}
