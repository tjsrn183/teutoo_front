"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import close from "../../../../public/join/close.png";

export default function Location() {
  const router = useRouter();
  const onClickClose = () => {
    router.back();
  };
  return (
    <>
      <div className="fixed inset-0 z-40 bg-gray-700 opacity-50"></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="w-2/3 h-1/2 text-center bg-white rounded-[6px] shadow-2xl flex flex-col">
          <div className="flex justify-end">
            <button className="mt-2 mr-2" onClick={onClickClose}>
              <Image src={close} alt="close" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
