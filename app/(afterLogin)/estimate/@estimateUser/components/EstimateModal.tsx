import { useImperativeHandle, forwardRef, useRef, useState } from "react";
import Image from "next/image";
import close from "@/public/join/close.png";
import ModalElement from "./ModalElement";
import LightButton from "@/components/LightButton";
import { useQuery } from "@tanstack/react-query";
import { getOneEstimateT } from "../../api/getOneEstimateT";
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

export const EstimateModal = forwardRef<ModalDialogHandle, EstimateModalProps>(
  (props, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const { data, isLoading } = useQuery({
      queryKey: ["oneEstimateT", props.dataId],
      queryFn: getOneEstimateT(props.dataId),
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
        className="text-black w-full h-[60%] rounded-[12px] "
        ref={dialogRef}
      >
        <div className=" flex flex-col ">
          <button
            onClick={handleCloseClick}
            className="flex mt-3 mr-3 justify-end active:border-none"
          >
            <Image src={close} alt="close" />
          </button>

          <span className=" text-[30px] flex justify-center">견적서</span>
          <div className=" w-[90%] relative left-5">
            {isLoading ? (
              <Looading height={386} />
            ) : (
              <div className=" ">
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
                <div className="flex justify-center">
                  <LightButton width="w-[90%]">
                    <Link href={`/chat/${props.memberId}`}>채팅하기</Link>
                  </LightButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </dialog>
    );
  },
);

EstimateModal.displayName = "EstimateModal";
