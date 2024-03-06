"use client";
import LightButton from "@/components/LightButton";
import TextField from "../../../components/formElement/TextField";
import TextArea from "@/components/formElement/TextArea";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { zodTrainerSchema } from "../zodTrainerSchema";
import { useForm } from "react-hook-form";
import { PicturesElement } from "@/components/PicturesElement";
import { Picture } from "@/components/PicturesElement";
interface TrainerInfo {
  simpleInfo: string;
  title: string;
  content: string;
}
export default function IntroTrainerForm() {
  const [pictureArr, setPictureArr] = useState<Array<Picture>>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TrainerInfo>({
    resolver: zodResolver(zodTrainerSchema),
  });
  const onSubmit = () => {
    console.log("submit");
  };

  return (
    <form
      className="flex flex-col mt-3 mx-3 border-2 border-[#DDE1E6] rounded-[12px] py-3 px-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        title="간단 소개"
        placeholder="본인을 간단히 소개하세요"
        register={{ ...register("simpleInfo") }}
      />
      {errors.simpleInfo && (
        <p className="text-red-600 font-bold">{errors.simpleInfo.message}</p>
      )}
      <TextField
        title="상세 소개 제목"
        placeholder="제목을 입력하세요"
        register={{ ...register("title") }}
      />
      {errors.title && (
        <p className="text-red-600 font-bold">{errors.title.message}</p>
      )}
      <TextArea
        title="상세 소개 내용"
        placeholder="내용을 입력하세요"
        register={{ ...register("content") }}
      />
      {errors.content && (
        <p className="text-red-600 font-bold">{errors.content.message}</p>
      )}

      <span className="my-3 text-sm font-semibold">자격 증명</span>

      <PicturesElement pictureArr={pictureArr} setPictureArr={setPictureArr} />

      <LightButton type="submit">트레이너 소개 등록</LightButton>
    </form>
  );
}
