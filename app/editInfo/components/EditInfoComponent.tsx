"use client";
import Image from "next/image";
import back from "@/public/back.png";
import { useRouter } from "next/navigation";
import JoinForm from "@/app/join/components/JoinForm";
import { JoinFormData } from "@/app/join/components/JoinForm";
import { locationStore } from "@/store/locationStore";
import { useEditInfo } from "../lib/useEditInfo";
import { useState } from "react";
import { zodEditInfoSchema } from "../zodEditInfoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ButtonBundle from "./ButtonBuntle";

export default function EditInfoPage() {
  const mutation = useEditInfo();
  const [clickSubmit, setClickSubmit] = useState<boolean>(false);
  const router = useRouter();
  const onClickBack = () => {
    router.back();
  };
  const { location, setLocation } = locationStore();
  const onSubmit = (data: JoinFormData) => {
    setClickSubmit(true);
    if (location) {
      const { email, name, password, sortRole } = data;
      console.log("zzz");
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinFormData>({
    resolver: zodResolver(zodEditInfoSchema),
  });
  return (
    <div className="bg-white w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col px-4 ">
        <JoinForm
          register={register}
          errors={errors}
          clickSubmit={clickSubmit}
          location={location}
        />
        <ButtonBundle />
      </form>
    </div>
  );
}
