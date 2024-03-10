import { UseFormRegisterReturn } from "react-hook-form";
interface TextAreaProps {
  title: string;
  placeholder: string;
  register?: UseFormRegisterReturn;
}
export default function TextArea({
  title,
  placeholder,
  register,
}: TextAreaProps) {
  return (
    <label className="my-2">
      <span className="text-sm font-semibold text-black">{title}</span>
      <textarea
        placeholder={placeholder}
        className=" text-[#697077] pl-2 w-full h-[100px]  border border-[#d9d9d9] rounded-[12px]  focus:outline-none focus:ring-0 focus:border-[#22C55E] hover:border-[#22C55E] transition-colors duration-500"
        {...register}
      ></textarea>
    </label>
  );
}
