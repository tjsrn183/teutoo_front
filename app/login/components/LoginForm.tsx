"use client";
import { useState } from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import visible from "../../../public/join/visible.png";
import { zodLoginSchema } from "../zodLoginSchema";
import Button from "@/components/Button";

export interface LoginFormData {
  password: string;
  email: string;
}
export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { register, handleSubmit, formState } = useForm<LoginFormData>({
    resolver: zodResolver(zodLoginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("ㅋㅋdata", data);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col mx-4 flex-1 justify-center my-5"
    >
      <label className="text-[#323232] flex flex-col font-bold my-1">
        이메일
        <input
          {...register("email")}
          type="text"
          placeholder="이메일을 입력하세요"
          className="bg-[#e4e6e7] rounded-[6px] py-2 font-normal"
        />
        {formState?.errors.email && (
          <p className="text-[#323232] font-bold">
            {formState.errors.email.message}
          </p>
        )}
      </label>

      <div className="relative my-3">
        <label className="text-[#323232] flex flex-col font-bold">
          비밀번호
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호를 입력하세요"
            className="bg-[#e4e6e7] rounded-[6px] py-2 font-normal"
          />
        </label>
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-2 top-1/2"
        >
          <Image src={visible} alt="visible" width={20} height={20} />
        </button>
        {formState.errors.password && (
          <p className="text-[#323232] font-bold">
            {formState.errors.password.message}
          </p>
        )}
      </div>

      <Button type="submit">로그인</Button>
    </form>
  );
}
