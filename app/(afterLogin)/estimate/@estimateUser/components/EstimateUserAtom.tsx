"use client";
import Image from "next/image";
import userThumb from "@/public/trainerMyPageIcons/userThumb.png";
import LightButton from "@/components/LightButton";
import { EstimateModal, ModalDialogHandle } from "./EstimateModal";
import { RefObject, useRef } from "react";
import { EstimateItemAtom } from "../../types";
import { formatKRW } from "../lib/formatKRW";

export default function EstimateUserAtom({ data }: { data: EstimateItemAtom }) {
  const dialogRef: RefObject<ModalDialogHandle> = useRef(null);
  const handleOpenModal = () => {
    dialogRef.current?.openModal();
  };

  return (
    <div className="bg-white h-[82px] rounded-[12px] text-black text-sm my-2 font-bold drop-shadow-lg mx-5 flex items-center justify-between">
      <div className="flex items-center ml-3 w-[48%]">
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
        <span className="mx-3  truncate">{data.name}</span>
      </div>

      <span className=" truncate mr-1 w-[20%]">{formatKRW(data.price)}</span>
      <div className="mr-3 w-[20%]">
        <LightButton width="w-[70px]" onClick={handleOpenModal}>
          낙찰
        </LightButton>
      </div>
      <EstimateModal
        ref={dialogRef}
        dataId={data.estimateId}
        memberId={data.memberId}
      />
    </div>
  );
}
