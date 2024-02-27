import { UseFormRegisterReturn } from "react-hook-form";
interface TextFieldProps {
  title: string;
  placeholder: string;
  register?: UseFormRegisterReturn;
  type?: string;
}

export default function TextField({
  title,
  placeholder,
  register,
  type,
}: TextFieldProps) {
  return (
    <label className="text-black flex flex-col my-2">
      <span className="text-sm font-semibold">{title}</span>

      <input
        type={type || "text"}
        placeholder={placeholder}
        className=" text-[#697077] border border-[#DDE1E6] rounded-[12px] h-[38px]"
        {...register}
      />
    </label>
  );
}
