import { IFormData } from "@/app/login/components/LoginForm";
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface InputFieldProps {
  label: string;
  register: UseFormRegister<IFormData>;
  name: string;
  type?: string;
  placeholder: string;
}

export default function InputField({
  label,
  register,
  name,
  type = "text",
  placeholder,
}: InputFieldProps) {
  return (
    <>
      <label className="text-[#323232] flex flex-col font-bold my-1">
        {label}
        <input
          {...register(name as any)}
          type={type}
          placeholder={placeholder}
          className="bg-[#e4e6e7] rounded-[6px] py-2 font-normal"
        />
      </label>
    </>
  );
}
