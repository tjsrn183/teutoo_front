"use client";
import { useImperativeHandle, forwardRef, useRef } from "react";
import Image from "next/image";
import close from "@/public/join/close.png";
import ModalElement from "./ModalElement";
import LightButton from "@/components/LightButton";
export interface ModalDialogHandle {
  openModal: () => void;
  closeModal: () => void;
}

export const EstimateModal = forwardRef<ModalDialogHandle, {}>((props, ref) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    openModal: () => {
      dialogRef.current?.showModal();
    },
    closeModal: () => {
      dialogRef.current?.close();
    },
  }));

  const handleCloseClick = () => {
    dialogRef.current?.close();
  };

  return (
    <dialog
      className="text-black w-full h-[60%] rounded-[12px] "
      ref={dialogRef}
    >
      <div className=" flex flex-col ">
        <button
          onClick={handleCloseClick}
          className="flex mt-3 mr-3 justify-end"
        >
          <Image src={close} alt="close" />
        </button>

        <span className=" text-[30px] flex justify-center">견적서</span>
        <div className=" w-[90%] relative left-5">
          <ModalElement title="이름" value="최강헬창" />
          <ModalElement title="가격" value="50000₩" />
          <ModalElement title="프로그램" value="40대 부장님 다시한번 20대" />
          <ModalElement title="위치" value="대전특별시 서초구" />
          <ModalElement title="일정" value="2024 / 01 /23 13:00~14:00" />
        </div>
      </div>
      <div className=" sticky bottom-4 flex justify-center">
        <LightButton width="w-[200px]">낙찰하기</LightButton>
      </div>
    </dialog>
  );
});

EstimateModal.displayName = "EstimateModal";
