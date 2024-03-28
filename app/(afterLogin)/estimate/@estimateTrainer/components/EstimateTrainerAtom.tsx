import Image from "next/image";
import userThumb from "@/public/trainerMyPageIcons/userThumb.png";
import LightButton from "@/components/LightButton";

import { formatKRW } from "../../@estimateUser/lib/formatKRW";
import { EstimateItemAtom } from "../../types";
export default function EstimateTrainerAtom({
  data,
}: {
  data: EstimateItemAtom;
}) {
  return (
    <div className=" bg-white h-[82px] rounded-[12px]  text-black text-sm my-2 font-bold drop-shadow-lg mx-5">
      <div className=" w-full flex items-center justify-center h-full">
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

          <span className="mx-3 truncate">{data.name}</span>
        </div>

        <span className=" mx-2 w-[20%] truncate">{formatKRW(data.price)}</span>
        <LightButton width="w-[25%]" className=" rounded-xl mr-3">
          입찰
        </LightButton>
      </div>
    </div>
  );
}
