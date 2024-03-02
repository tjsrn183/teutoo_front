import estimateButton from "@/public/estimate/estimateButton.png";
import Image from "next/image";
export default function EstimateButton() {
  return (
    <button
      className=" text-white flex justify-center items-center bg-[#22C55E] w-[97px] h-[40px] rounded-[12px] drop-shadow-md"
      type="button"
    >
      <Image src={estimateButton} alt="신청서" />
      신청서
    </button>
  );
}
