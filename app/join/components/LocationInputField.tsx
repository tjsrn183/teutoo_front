import search from "../../../public/etc/search.png";
import Image from "next/image";

export default function LocationInputField() {
  return (
    <div className="relative">
      <input
        type="text"
        className=" rounded-[6px] border-2 border-[#A3D193] w-full h-[48px] text-black"
      />
      <button className=" absolute top-1/2 right-2 -translate-y-2">
        <Image src={search} alt="search" />
      </button>
    </div>
  );
}
