"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import close from "@/public/join/close.png";
import Map from "@/app/join/components/KakaoMap";

export default function Location() {
  const router = useRouter();
  const onClickClose = () => {
    router.back();
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-gray-700 opacity-50"></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="w-4/5 h-2/5 text-center bg-white rounded-[6px] shadow-2xl flex flex-col p-2">
          <div className="flex justify-end">
            <button
              className=" m-1 active:bg-gray-200 rounded-lg bg-[#22C55E] px-2"
              onClick={onClickClose}
            >
              <span className=" font-extrabold text-white text-lg">x</span>
            </button>
          </div>

          <Map />
        </div>
      </div>
    </>
  );
}
