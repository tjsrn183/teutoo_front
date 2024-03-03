import locationMarker from "@/public/estimate/locationMarker.png";
import Image from "next/image";
import chevronDown from "@/public/estimate/chevronDown.png";
export default function ButtonLocation() {
  return (
    <div className=" flex rounded-lg w-[200px] justify-between bg-white drop-shadow-lg py-2 px-2">
      <Image
        src={locationMarker}
        alt="locationMarker"
        className=" color "
        width={24}
        height={24}
      />
      <div className=" text-gray-400 font-semibold ">지역을 선택하세요</div>
      <div className=" flex flex-col justify-center">
        <Image src={chevronDown} alt="chevronDown" width={10} height={10} />
      </div>
    </div>
  );
}
