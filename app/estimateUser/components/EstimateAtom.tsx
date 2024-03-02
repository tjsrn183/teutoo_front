"use client";
import Image from "next/image";
import userThumb from "@/public/trainerMyPageIcons/userThumb.png";
import Button from "@/components/Button";
import { EstimateModal, ModalDialogHandle } from "./EstimateModal";
import { MutableRefObject, RefObject, useRef } from "react";
export default function EstimateAtom() {
  const dialogRef: RefObject<ModalDialogHandle> = useRef(null);

  const handleOpenModal = () => {
    dialogRef.current?.openModal();
  };

  return (
    <div className=" bg-white h-[82px] rounded-[12px]  text-black text-sm my-3 font-bold mx-5 drop-shadow-lg">
      <div className=" w-full flex items-center justify-center h-full">
        <div className=" flex justify-center items-center mx-3">
          <Image src={userThumb} alt="userThumb" width={60} height={60} />
          <span>김헬창</span>
        </div>

        <span className="flex justify-center mx-3">24000 ₩</span>
        <Button width="w-[25%]" onClick={handleOpenModal}>
          낙찰
        </Button>
      </div>
      <EstimateModal ref={dialogRef} />
    </div>
  );
}
