import Image from "next/image";
import search from "@/public/etc/search.png";
interface OnlyTextFieldProps {
  type?: string;
  placeholder?: string;
  data?: string;
  disable?: boolean;
  setState?: React.Dispatch<React.SetStateAction<any>>;
  state?: string;
}
export default function SearchInput({
  type,
  placeholder,
  data,
  disable,
  setState,
  state,
}: OnlyTextFieldProps) {
  return (
    <form className="w-full bg-white flex text-[#697077] pl-2 h-[38px] border border-[#d9d9d9] rounded-[12px]  focus:outline-none focus:ring-0 focus:border-[#22C55E] hover:border-[#22C55E] transition-colors duration-500">
      <input
        type={type || "text"}
        placeholder={placeholder}
        className="   focus:outline-none w-full"
        defaultValue={data}
        disabled={disable}
        onChange={(e) => setState && setState(e.target.value)}
      />
      <div className=" w-7 mr-3 h-full flex items-center">
        <Image src={search} alt="search" layout="responsive" width={20} />
      </div>
    </form>
  );
}
