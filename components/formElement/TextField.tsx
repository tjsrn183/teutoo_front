import { UseFormRegisterReturn } from "react-hook-form";
interface TextFieldProps {
  title: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  type?: string;
  id?: string;
}

export default function TextField({
  title,
  placeholder,
  register,
  type,
  id,
}: TextFieldProps) {
  return (
    <label className="text-black flex flex-col my-2 relative">
      <span className="text-sm font-semibold">{title}</span>

      <input
        type={type || "text"}
        placeholder={placeholder}
        className=" text-[#697077] pl-2 h-[38px] border border-[#d9d9d9] rounded-[12px]  focus:outline-none focus:ring-0 focus:border-[#22C55E] hover:border-[#22C55E] transition-colors duration-500 "
        {...register}
      />
      {id === "won" ? (
        <span className=" absolute right-0 -translate-x-5 translate-y-7">
          ₩
        </span>
      ) : (
        <div />
      )}
    </label>
  );
}
