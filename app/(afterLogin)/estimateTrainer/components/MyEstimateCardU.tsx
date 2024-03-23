import { formatKRW } from "../../estimateUser/lib/formatKRW";
import { MyEstimatePropsT } from "./MyEstimateU";

export default function MyEstimateCardU({ data }: MyEstimatePropsT) {
  return (
    <div className=" px-5">
      <div className=" w-full relative flex justify-center top-5">
        <div className=" h-[220px]  w-full ">
          <div className=" bg-gradient-to-br from-[#049639] to-[#abd8bc]  h-[185px] flex flex-col justify-center items-start rounded-xl px-6 drop-shadow-lg">
            <div className="  text-[#67cf37] font-semibold text-lg italic">
              {data?.name}
            </div>

            <div className="text-[#67cf37] text-lg font-semibold italic">
              {data?.ptAddress}
            </div>
            <div className="text-[#67cf37] text-lg font-semibold italic">
              {data?.ptProgram?.ptProgramName}
            </div>
            <div className=" max-w-full text-5xl font-extrabold text-white truncate">
              {formatKRW(data?.price)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
