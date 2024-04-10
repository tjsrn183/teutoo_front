import estimateButton from "@/public/estimate/estimateButton.png";
import Image from "next/image";
import Link from "next/link";
export default function EstimateButton({ content }: { content: string }) {
  return (
    <Link href="estimatePaper">
      <button
        className=" text-white flex justify-center items-center bg-[#22C55E] w-[97px] h-[40px] rounded-[12px] drop-shadow-md active:bg-[#90dfad]"
        type="button"
      >
        <Image src={estimateButton} alt="신청서" />
        {content}
      </button>
    </Link>
  );
}
