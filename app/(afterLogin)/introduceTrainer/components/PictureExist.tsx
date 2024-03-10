"use client";
import { ImgType } from "./IntroTrainerForm";
import Image from "next/image";
import close from "@/public/join/close.png";
import { useQueryClient } from "@tanstack/react-query";
import { useRef, Dispatch, SetStateAction } from "react";

interface ImgProps {
  fetchImg: Array<ImgType>;
  setDeleteImg: Dispatch<SetStateAction<Array<string>>>;
}

export default function PictureExist({ fetchImg, setDeleteImg }: ImgProps) {
  const queryClient = useQueryClient();

  const onRemoveImage = (index: number) => () => {
    const updatedImages = fetchImg.filter((_, idx) => idx !== index);
    queryClient.setQueryData(
      ["trainerIntro"],
      (prev: { careerImgList: ImgType[] }) => {
        const copy = {
          ...prev,
          careerImgList: updatedImages,
        };
        return copy;
      },
    );
    setDeleteImg((prev) => [...prev, fetchImg[index].imgName]);
  };

  return (
    <div>
      <div className="flex flex-wrap">
        {fetchImg?.map(
          (v, index) =>
            v && (
              <div key={index} className=" w-[30%] p-1  relative">
                <button
                  className="absolute top-1 left-1"
                  onClick={onRemoveImage(index)}
                  type="button"
                >
                  <Image src={close} alt="close" />
                </button>
                <img src={v.imgUrl} alt="미리보기" className="w-full h-full" />
              </div>
            ),
        )}
      </div>
    </div>
  );
}
