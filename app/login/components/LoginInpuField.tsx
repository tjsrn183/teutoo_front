import { UseFormRegisterReturn, useForm } from "react-hook-form";

interface LoginInputFiledProps {
  title: string;
  register: UseFormRegisterReturn;
  placeholder: string;
  type?: string;
}
export default function LoginInputField({
  title,
  register,
  placeholder,
  type,
}: LoginInputFiledProps) {
  return (
    <label className="text-[#323232] flex flex-col font-bold my-1">
      {title}
      <input
        {...register}
        type={type ? type : "text"}
        placeholder={placeholder}
        className="bg-[#e4e6e7] py-2 font-normal  border border-[#d9d9d9] rounded-[12px]  focus:outline-none focus:ring-0 focus:border-[#22C55E] hover:border-[#22C55E] transition-colors duration-500"
      />
    </label>
  );
}
