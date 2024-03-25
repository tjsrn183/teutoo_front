"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import visible from "../../../public/join/visible.png";
import { zodLoginSchema } from "../zodLoginSchema";
import LightButton from "@/components/LightButton";
import LoginInputField from "./LoginInpuField";
import { useLogin } from "../api/useLogin";
import Link from "next/link";

export interface LoginFormData {
  password: string;
  email: string;
}
export default function LoginForm() {
  const mutation = useLogin();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { register, handleSubmit, formState } = useForm<LoginFormData>({
    resolver: zodResolver(zodLoginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    const dataObj = new URLSearchParams();
    dataObj.append("email", data.email);
    dataObj.append("password", data.password);
    mutation.mutate(dataObj);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col mx-4 flex-1 justify-center my-5"
    >
      <LoginInputField
        title="이메일"
        placeholder="이메일을 입력하세요"
        register={{ ...register("email") }}
      />
      {formState?.errors.email && (
        <p className="text-[#323232] font-bold">
          {formState.errors.email.message}
        </p>
      )}

      <div className="relative my-2">
        <LoginInputField
          title="비밀번호"
          placeholder="비밀번호를 입력하세요"
          register={{ ...register("password") }}
          type={showPassword ? "text" : "password"}
        />

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
      <Link
        href="/immepassword"
        className="text-[#323232] flex justify-end items-center mb-1 text-sm"
      >
        PW찾기
      </Link>

      <LightButton type="submit">로그인</LightButton>
    </form>
  );
}
