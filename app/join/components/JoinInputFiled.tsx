import { UseFormRegisterReturn } from "react-hook-form";

interface JoinInputFiledProps {
  title: string;
  register: UseFormRegisterReturn;
  placeholder: string;
  type?: "text" | "password";
  value?: string;
  disabled?: boolean;
}
export default function JoinInputField({
  title,
  register,
  placeholder,
  type,
  value,
  disabled,
}: JoinInputFiledProps) {
  return (
    <label className="text-[#323232] flex flex-col font-bold my-1">
      {title}
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className="bg-[#e4e6e7] rounded-[6px] py-2 font-normal"
        value={value}
        disabled={disabled}
      />
    </label>
  );
}
