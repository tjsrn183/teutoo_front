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
  const onChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        className=" border-2 w-full h-[48px] text-black border-[#d9d9d9] rounded-[12px]  focus:outline-none focus:ring-0 focus:border-[#22C55E] hover:border-[#22C55E] transition-colors duration-500 "
        onChange={onChangeLocation}
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
