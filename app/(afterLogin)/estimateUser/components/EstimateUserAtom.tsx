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
    <div className="bg-white h-[82px] rounded-[12px] text-black text-sm my-2 font-bold drop-shadow-lg mx-2 flex items-center justify-between">
      <div className="flex items-center ml-3">
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
        <span
          className="mx-3 whitespace-nowrap overflow-hidden text-ellipsis"
          style={{ maxWidth: "150px" }}
        >
          {data.name}
        </span>
      </div>

      <span>{data.price} ₩</span>
      <div className="mr-3">
        <LightButton width="w-[70px]" onClick={handleOpenModal}>
          낙찰
        </LightButton>
      </div>
      <EstimateModal ref={dialogRef} />
    </div>
  );
}
