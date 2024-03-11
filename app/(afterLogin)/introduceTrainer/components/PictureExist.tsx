"use client";
import { ImgType } from "./IntroTrainerForm";
import Image from "next/image";
import close from "@/public/join/close.png";
import { useQueryClient } from "@tanstack/react-query";
import { useRef, Dispatch, SetStateAction } from "react";
import { getProgramList } from "../../programManage/components/ProgramManageComponent";
import { ProgramDataServer } from "../../programManage/components/ProgramForm";

interface ImgProps {
  fetchImg: Array<ImgType>;
  setDeleteImg: Dispatch<SetStateAction<Array<string>>>;
  fromWhere?: string;
  programId?: number;
}

export default function PictureExist({
  fetchImg,
  setDeleteImg,
  fromWhere,
  programId,
}: ImgProps) {
  const queryClient = useQueryClient();
  const onRemoveImage = (index: number) => () => {
    const updatedImages = fetchImg.filter((_, idx) => idx !== index);
    console.log("updatedImage", updatedImages);
    if (fromWhere === "ProgramManage") {
      console.log("프로그램 매니지 조건문실행");
      queryClient.setQueryData(
        ["trainerProgram"],
        (prev: { ptProgramResList: ProgramDataServer[] }) => {
          if (
            programId !== undefined &&
            programId >= 0 &&
            programId < prev.ptProgramResList.length
          ) {
            const copy = { ...prev };
            const updatedProgram = { ...copy.ptProgramResList[programId - 1] };
            updatedProgram.ptProgramImgList = updatedImages;
            copy.ptProgramResList[programId - 1] = updatedProgram;
            console.log("카파야ㅕ", copy.ptProgramResList[programId - 1]);
            // 이 부분에서 변경된 객체를 반환해야 합니다.
            return copy; // 변경된 객체 반환
          }
          // programId가 유효하지 않은 경우 기존 상태 반환
          return prev;
        },
      );
    } else {
      console.log("인트로 매니지 조건문실행");
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
