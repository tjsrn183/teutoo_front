import { UseFormRegisterReturn } from "react-hook-form";
interface TextAreaProps {
  title: string;
  placeholder: string;
  register: UseFormRegisterReturn;
}
export default function TextArea({
  title,
  placeholder,
  register,
}: TextAreaProps) {
  return (
    <label className="my-2">
      <span className="text-sm font-semibold">{title}</span>
      <textarea
        placeholder={placeholder}
        className=" text-[#697077] border border-[#DDE1E6] rounded-[12px] w-full h-[150px]"
        {...register}
      ></textarea>
    </label>
  );
}
