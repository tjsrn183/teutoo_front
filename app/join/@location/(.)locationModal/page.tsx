"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import close from "../../../../public/join/close.png";
import Map from "../../components/KakaoMap";

export default function Location() {
  const router = useRouter();
  const onClickClose = () => {
    router.back();
  };

  return (
    <div>
      <div className="fixed inset-0 z-30 bg-gray-700 opacity-50"></div>
      <div className="fixed inset-0 z-40 flex items-center justify-center">
        <div className="w-4/5 h-2/5 text-center bg-white rounded-[6px] shadow-2xl flex flex-col p-2">
          <div className="relative z-50 flex justify-end">
            <button className="mt-2 mr-2" onClick={onClickClose}>
              <Image src={close} alt="close" width={10} height={10} />
            </button>
          </div>

          <Map />
        </div>
      </div>
    </div>
  );
}
