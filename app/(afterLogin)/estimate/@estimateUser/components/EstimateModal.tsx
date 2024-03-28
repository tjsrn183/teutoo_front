import { useImperativeHandle, forwardRef, useRef, useState } from "react";
import Image from "next/image";
import close from "@/public/join/close.png";
import ModalElement from "./ModalElement";
import LightButton from "@/components/LightButton";
import { useQuery } from "@tanstack/react-query";
import { sendRequest } from "@/app/api/rootApi";
import Looading from "@/components/Loading";
import { formatKRW } from "../lib/formatKRW";
import Link from "next/link";
export interface ModalDialogHandle {
  openModal: () => void;
  closeModal: () => void;
  dataId: number;
}
interface EstimateModalProps {
  dataId: number;
  memberId: number;
}
const fetchOneEstimateT = (dataId: number) => async () => {
  let estimateT = null;

  if (dataId) {
    estimateT = await sendRequest(`trainer/estimates/${dataId}`);
  }
  return estimateT;
};
export const EstimateModal = forwardRef<ModalDialogHandle, EstimateModalProps>(
  (props, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const { data, isLoading } = useQuery({
      queryKey: ["oneEstimateT", props.dataId],
      queryFn: fetchOneEstimateT(props.dataId),
      enabled: isOpen,
    });

    useImperativeHandle(ref, () => ({
      openModal: () => {
        dialogRef.current?.showModal();
        setIsOpen(true);
      },
      closeModal: () => {
        dialogRef.current?.close();
        setIsOpen(false);
      },
      dataId: 0,
    }));

    const handleCloseClick = () => {
      dialogRef.current?.close();
    };

    return (
      <dialog
        className="text-black w-full h-[50%] rounded-[12px] "
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
            {isLoading ? (
              <Looading height={386} />
            ) : (
              <>
                <ModalElement title="이름" value={data?.data.name} />
                <ModalElement
                  title="가격"
                  value={`${formatKRW(data?.data?.price)}`}
                />
                <ModalElement
                  title="프로그램"
                  value={data?.data.ptProgram?.ptProgramName}
                />
                <ModalElement title="위치" value={data?.data.ptAddress} />
                <div className=" sticky bottom-4 flex justify-center">
                  <LightButton width="w-[200px]">
                    <Link href={`/chat/${props.memberId}`}>낙찰하기</Link>
                  </LightButton>
                </div>
              </>
            )}
          </div>
        </div>
      </dialog>
    );
  },
);

EstimateModal.displayName = "EstimateModal";
