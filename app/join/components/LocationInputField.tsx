import search from "../../../public/etc/search.png";
import Image from "next/image";
interface addressProps {
  setAddress: (address: string) => void;
  searchAddress: () => void;
}

export default function LocationInputField({
  setAddress,
  searchAddress,
}: addressProps) {
  return (
    <div className="relative">
      <input
        type="text"
        className=" rounded-[6px] border-2 border-[#A3D193] w-full h-[48px] text-black"
        onChange={(e) => setAddress(e.target.value)}
      />
      <button
        className=" absolute top-1/2 right-2 -translate-y-2"
        onClick={searchAddress}
      >
        <Image src={search} alt="search" />
      </button>
    </div>
  );
}
