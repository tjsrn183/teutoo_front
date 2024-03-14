"use client";
import Image from "next/image";
import userThumb from "@/public/trainerMyPageIcons/userThumb.png";
import LightButton from "@/components/LightButton";
import { EstimateModal, ModalDialogHandle } from "./EstimateModal";
import { RefObject, useRef } from "react";
import { EstimateItemAtom } from "../layout";

export default function EstimateUserAtom({ data }: { data: EstimateItemAtom }) {
  const dialogRef: RefObject<ModalDialogHandle> = useRef(null);
  const handleOpenModal = () => {
    dialogRef.current?.openModal();
  };

  return (
    <div className=" bg-white h-[82px] rounded-[12px]  text-black text-sm my-2 font-bold drop-shadow-lg mx-2">
      <div className=" w-full flex items-center justify-center h-full">
        <div className=" flex justify-center items-center mx-3">
          {data.profileImagePath ? (
            <Image
              src={data.profileImagePath}
              alt="userProfile"
              width={60}
              height={60}
            />
          ) : (
            <Image src={userThumb} alt="userThumb" width={60} height={60} />
          )}

          <span className="mx-3">{data.name}</span>
        </div>

        <span className="flex justify-center mx-2">{data.price} ₩</span>
        <LightButton width="w-[25%]" onClick={handleOpenModal}>
          낙찰
        </LightButton>
      </div>

      <EstimateModal ref={dialogRef} />
    </div>
  );
}
