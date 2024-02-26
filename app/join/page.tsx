"use client";
import JoinForm from "./components/JoinForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { zodJoinSchema } from "./zodJoinSchema";
import { JoinFormData } from "./components/JoinForm";
import { useState } from "react";
import { useSignup } from "./lib/useSignup";
import ButtonBundle from "./components/ButtonBundle";
import { locationStore } from "@/store/locationStore";

export default function Join() {
  const mutation = useSignup();
  const [clickSubmit, setClickSubmit] = useState<boolean>(false);
  const { location, setLocation, resetLocation } = locationStore();
  const onSubmit = (data: JoinFormData) => {
    setClickSubmit(true);
    if (location) {
      const { email, name, password, sortRole } = data;
      mutation.mutate({ address: location, email, name, password, sortRole });
      resetLocation();
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinFormData>({
    resolver: zodResolver(zodJoinSchema),
  });
  return (
    <div className="flex flex-col bg-white min-h-screen items-center">
      <h1 className="text-[#323232] text-center text-[32px] font-bold mt-9">
        회원가입
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col flex-1  my-5 w-screen px-4"
      >
        <JoinForm
          register={register}
          errors={errors}
          location={location}
          clickSubmit={clickSubmit}
        />
        <ButtonBundle />
      </form>
      <div className=" pb-10" />
    </div>
  );
}
