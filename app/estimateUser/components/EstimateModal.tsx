"use client";
import { useImperativeHandle, forwardRef, useRef } from "react";
import Image from "next/image";
import close from "@/public/join/close.png";
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
      className="text-black w-full h-[60%] rounded-[12px]"
      ref={dialogRef}
    >
      <div className=" flex flex-col">
        <button
          onClick={handleCloseClick}
          className="flex justify-end mt-3 mr-3"
        >
          <Image src={close} alt="close" />
        </button>
        <span className=" text-[30px] flex justify-center">견적서</span>
        <div className=" flex flex-col ">
          <span className=" text-gray-400">가격</span>
          <span className=" text-xl">50000₩</span>
        </div>
        <div className=" flex flex-col ">
          <span className=" text-gray-400">프로그램</span>
          <span className=" text-xl">40대 부장님 다시한번 20대</span>
        </div>
        <div className=" flex flex-col">
          <span className=" text-gray-400">위치</span>
          <span className=" text-xl">대전특별시 서초구</span>
        </div>
        <div className=" flex flex-col">
          <span className=" text-gray-400">일정</span>
          <span className=" text-xl">2024 / 01 /23 13:00~14:00</span>
        </div>
      </div>
    </dialog>
  );
});

EstimateModal.displayName = "EstimateModal";
