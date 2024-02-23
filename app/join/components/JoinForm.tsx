"use client";
import { useState, useRef, ChangeEventHandler } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { zodJoinSchema } from "../zodJoinSchema";
import Image from "next/image";
import visible from "../../../public/join/visible.png";
import Button from "@/components/Button";
import plus from "../../../public/join/plus.png";
import Link from "next/link";
import { locationStore } from "@/store/locationStore";
interface JoinFormData {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
  address: string;
  isTrainer: boolean;
}

export default function JoinForm() {
  const { location, setLocation } = locationStore();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const imageRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string>();
  const onClickPictureButton = () => {
    imageRef.current?.click();
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinFormData>({
    resolver: zodResolver(zodJoinSchema),
  });
  const onSubmit = (data: JoinFormData) => {
    console.log(data);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleImageChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
    }
  };
  return (
    <div className="w-full">
      <div className="flex flex-row justify-center">
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="profile_image"
            className="rounded-full w-24 h-24"
          />
        ) : (
          <div className="rounded-full w-24 h-24 font-black bg-slate-500 " />
        )}
        <div className="flex items-end">
          <input
            type="file"
            accept="image/*"
            hidden
            ref={imageRef}
            onChange={handleImageChange}
          />
          <button className="focus:bg-zinc-400 rounded-full">
            <Image
              src={plus}
              alt="profile_picture"
              width={20}
              height={20}
              onClick={onClickPictureButton}
            />
          </button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col mx-4 flex-1  my-5"
      >
        <label className="text-[#323232] flex flex-col font-bold my-1">
          이메일
          <input
            type="text"
            placeholder="이메일을 입력하세요."
            {...register("email")}
            className="bg-[#e4e6e7] rounded-[6px] py-2 font-normal"
          />
        </label>

        {errors.email && (
          <p className="text-red-600 font-bold">{errors.email.message}</p>
        )}
        <label className="text-[#323232] flex flex-col font-bold my-1">
          이름
          <input
            type="text"
            placeholder="이름을 입력하세요."
            {...register("name")}
            className="bg-[#e4e6e7] rounded-[6px] py-2 font-normal"
          />
        </label>

        {errors.name && (
          <p className="text-red-600 font-bold">{errors.name.message}</p>
        )}

        <div className="relative my-3">
          <label className="text-[#323232] flex flex-col font-bold">
            비밀번호
            <input
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력하세요."
              {...register("password")}
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
          {errors.password && (
            <p className="text-red-600 font-bold">{errors.password.message}</p>
          )}
        </div>

        <div className="relative my-3">
          <label className="text-[#323232] flex flex-col font-bold">
            비밀번호 확인
            <input
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 한번더 입력하세요."
              {...register("passwordConfirmation")}
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
          {errors.passwordConfirmation && (
            <p className="text-red-600 font-bold">
              {errors.passwordConfirmation.message}
            </p>
          )}
        </div>

        <label className="text-[#323232] flex flex-col font-bold my-1">
          주소
          <input
            type="text"
            placeholder="주소를 입력하세요."
            {...register("address")}
            className="bg-[#e4e6e7] rounded-[6px] py-2 font-normal"
            disabled
            value={location}
          />
        </label>

        {errors.address && (
          <p className="text-red-600 font-bold">{errors.address.message}</p>
        )}
        <div>
          <input type="checkbox" id="isTrainer" {...register("isTrainer")} />
          <label htmlFor="isTrainer" className="text-[#323232]">
            트레이너 입니다.
          </label>
        </div>
        {errors.isTrainer && (
          <p className="text-red-600 font-bold">{errors.isTrainer.message}</p>
        )}
        <Link href="../../join/locationModal">
          <Button>주소찾기</Button>
        </Link>
        <Button type="submit" backgroundColor="bg-[#1C743C]" className="mt-2.5">
          회원가입
        </Button>
        <div className=" pb-10" />
      </form>
    </div>
  );
}
