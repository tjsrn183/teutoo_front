"use client";
import { useState } from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import visible from "../../../public/visible.png";
import { zodLoginSchema } from "../zodLoginSchema";
import InputField from "../../../components/InputField";

export interface IFormData {
  errors: {
    email: {
      message: string;
    };
    password: {
      message: string;
    };
  };
  password: string;
  email: string;
}
export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { register, handleSubmit, formState } = useForm<IFormData>({
    resolver: zodResolver(zodLoginSchema),
  });

  const onSubmit = (data: IFormData) => {
    console.log("ㅋㅋdata", data);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col mx-4 flex-1 justify-center my-8"
    >
      <InputField
        label="이메일"
        register={register}
        name="email"
        type="text"
        placeholder="이메일을 입력하세요"
      />
      {formState?.errors.email && (
        <p className="text-[#323232] font-bold">
          {formState.errors.email.message}
        </p>
      )}
      <div className="relative">
        <InputField
          label="비밀번호"
          register={register}
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="비밀번호를 입력하세요"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-2 top-1/2"
        >
          <Image src={visible} alt="visible" width={20} height={20} />
        </button>
      </div>
      {formState.errors.password && (
        <p className="text-[#323232] font-bold">
          {formState.errors.password.message}
        </p>
      )}

      <button
        type="submit"
        className="text-white bg-[#22C55E] rounded-[6px] w-full h-[48px]"
      >
        로그인
      </button>
    </form>
  );
}
