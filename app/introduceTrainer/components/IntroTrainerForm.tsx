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
import { useSetInfoTrainer } from "../api/useSetInfoTrainer";
import { useQueryClient } from "@tanstack/react-query";
import PictureExist from "./PictureExist";
interface TrainerInfo {
  simpleInfo: string;
  content: string;
  gymName: string;
}
export interface ImgType {
  imgName: string;
  imgUrl: string;
}

export interface getTrainerIntro {
  gymName: string;
  simpleIntro: string;
  introContent: string;
  careerImgList: Array<ImgType>;
}
export default function IntroTrainerForm() {
  const queryClient = useQueryClient();
  const data: getTrainerIntro | undefined = queryClient.getQueryData([
    "trainerIntro",
  ]);
  const [pictureArr, setPictureArr] = useState<Array<Picture>>([]);
  const [deleteImg, setDeleteImg] = useState<Array<string>>([]);

  const mutation = useSetInfoTrainer();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TrainerInfo>({
    resolver: zodResolver(zodTrainerSchema),
    defaultValues: {
      gymName: data?.gymName ?? undefined,
      simpleInfo: data?.simpleIntro ?? undefined,
      content: data?.introContent ?? undefined,
    },
  });
  const onSubmit = (data: TrainerInfo) => {
    const formdata = new FormData();
    formdata.append("gymName", data.gymName);
    formdata.append("simpleIntro", data.simpleInfo);
    formdata.append("introContent", data.content);

    pictureArr.forEach((picture) => {
      formdata.append("careerImgList", picture.file);
    });
    if (deleteImg.length > 0) {
      deleteImg.forEach((img) => {
        formdata.append("deletedImgList", img);
      });
    }

    mutation.mutate(formdata);
  };

  return (
    <form
      className="flex flex-col mt-3 mx-3 border-2 border-[#DDE1E6] rounded-[12px] py-3 px-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        title="헬스장 이름"
        placeholder="헬스장 이름을 입력하세요"
        register={{ ...register("gymName") }}
      />
      {errors.gymName && (
        <p className="text-red-600 font-bold">{errors.gymName.message}</p>
      )}
      <TextField
        title="간단 소개"
        placeholder="본인을 간단히 소개하세요"
        register={{ ...register("simpleInfo") }}
      />
      {errors.simpleInfo && (
        <p className="text-red-600 font-bold">{errors.simpleInfo.message}</p>
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
      {data?.careerImgList ? (
        <PictureExist
          fetchImg={data.careerImgList}
          setDeleteImg={setDeleteImg}
        />
      ) : (
        <></>
      )}
      <PicturesElement pictureArr={pictureArr} setPictureArr={setPictureArr} />
      <LightButton type="submit">트레이너 소개 등록</LightButton>
    </form>
  );
}
