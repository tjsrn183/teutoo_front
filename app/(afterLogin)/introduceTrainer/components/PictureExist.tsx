"use client";
import { ImgType } from "./IntroTrainerForm";
import Image from "next/image";
import close from "@/public/join/close.png";
import { useQueryClient } from "@tanstack/react-query";
import { useRef, Dispatch, SetStateAction } from "react";
import { ProgramDataServer } from "../../programManage/components/ProgramForm";

interface ImgProps {
  fetchImg: Array<ImgType>;
  setDeleteImg: Dispatch<SetStateAction<Array<string>>>;
  fromWhere?: string;
  programId?: number;
  programIndex?: number;
}

export default function PictureExist({
  fetchImg,
  setDeleteImg,
  fromWhere,
  programId,
  programIndex,
}: ImgProps) {
  const queryClient = useQueryClient();

  const onRemoveImage = (index: number) => () => {
    const updatedImages = fetchImg.filter((_, idx) => idx !== index);

    if (fromWhere === "ProgramManage") {
      queryClient.setQueryData(
        ["trainerProgram"],
        (prev: { ptProgramResList: ProgramDataServer[] }) => {
          if (programId !== undefined && programId >= 0) {
            const copy = { ...prev };
            const updatedProgram = { ...copy.ptProgramResList[programIndex!] };

            updatedProgram.ptProgramImgList = updatedImages;

            copy.ptProgramResList[programIndex!] = updatedProgram;

            return copy;
          }
        },
      );
    } else {
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
    }

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
