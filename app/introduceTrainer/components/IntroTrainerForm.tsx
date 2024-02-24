"use client";
import Button from "@/components/Button";
import TextField from "../../../components/formElement/TextField";
import TextArea from "@/components/formElement/TextArea";
import { useRef, useState, ChangeEventHandler } from "react";
import Image from "next/image";
import close from "@/public/join/close.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { zodTrainerSchema } from "../zodTrainerSchema";
import { useForm } from "react-hook-form";
interface TrainerInfo {
  simpleInfo: string;
  title: string;
  content: string;
}
export default function IntroTrainerForm() {
  const imgRef = useRef<HTMLInputElement>(null);
  const [pictureArr, setPictureArr] = useState<
    Array<{ dataUrl: string; file: File } | null>
  >([]);
  const onClickPicture = () => {
    imgRef.current?.click();
  };
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
  const onChangePicture: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      const fileReaders = Array.from(e.target.files).map((file) => {
        return new Promise<{ dataUrl: string; file: File }>(
          (resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve({
                dataUrl: reader.result as string,
                file,
              });
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
          },
        );
      });

      Promise.all(fileReaders)
        .then((files) => {
          setPictureArr((prevPreview) => [...prevPreview, ...files]);
        })
        .catch((error) => {
          console.error("Error reading files: ", error);
        });
    }
  };
  const onRemoveImage = (index: number) => () => {
    setPictureArr((prevPreview) => {
      const prev = [...prevPreview];
      prev[index] = null;
      return prev;
    });
  };
  return (
    <form
      className="flex flex-col mt-[70px] mx-3 border border-[#DDE1E6] rounded-[12px] py-3 px-2 "
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

      <span className="my-3 text-sm">자격 증명</span>

      <div className="flex flex-wrap">
        {pictureArr.map(
          (v, index) =>
            v && (
              <div key={index} className=" w-[30%] p-1  relative">
                <button
                  className="absolute top-1 left-1"
                  onClick={onRemoveImage(index)}
                >
                  <Image src={close} alt="close" />
                </button>

                <img src={v.dataUrl} alt="미리보기" className="w-full h-full" />
              </div>
            ),
        )}
      </div>
      <input
        type="file"
        hidden
        multiple
        ref={imgRef}
        accept="image/*"
        onChange={onChangePicture}
        name="imageFiles"
      />
      <button
        type="button"
        onClick={onClickPicture}
        className="w-full h-[37px] border border-[#DDE1E6] rounded-[12px] text-[#175601] font-semibold my-3"
      >
        + 사진 추가하기
      </button>
      <Button type="submit">트레이너 소개 등록</Button>
    </form>
  );
}
