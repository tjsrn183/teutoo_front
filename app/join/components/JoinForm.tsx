"use client";
import { useState, useRef, ChangeEventHandler } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import Image from "next/image";
import visible from "../../../public/join/visible.png";
import plus from "../../../public/join/plus.png";
import JoinInputField from "./JoinInputFiled";
import userThumb from "@/public/trainerMyPageIcons/userThumb.png";

export interface JoinFormData {
  email: string;
  name: string;
  password: string;
  passwordConfirmation?: string;
  address: string;
  sortRole: boolean;
  profileImage: File | null | undefined;
}
interface JoinFormProps {
  forEditInfo?: boolean;
  register: UseFormRegister<JoinFormData>;
  errors: FieldErrors<JoinFormData>;
  clickSubmit: boolean;
  location: string;
  selectedImage: string | undefined; //미리보기 이미지가 저장된 useState
  setSelectedImage: React.Dispatch<React.SetStateAction<string | undefined>>; //이미지 미리보기를 위해 이미지를 저장하는 useState함수
  setImageTarget: React.Dispatch<React.SetStateAction<File | null | undefined>>; //e.target.files 이미지
}
export default function JoinForm({
  register,
  errors,
  location,
  clickSubmit,
  selectedImage,
  setSelectedImage,
  setImageTarget,
  forEditInfo,
}: JoinFormProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const imageRef = useRef<HTMLInputElement>(null);

  const onClickPictureButton = () => {
    imageRef.current?.click();
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
      setImageTarget(e.target.files[0]);
    }
  };

  return (
    <div>
      <div className="flex flex-row justify-center">
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="profile_image"
            className="rounded-full w-24 h-24"
          />
        ) : (
          <Image src={userThumb} alt="userThumb" />
        )}
        <div className="flex items-end">
          <input
            type="file"
            accept="image/*"
            hidden
            ref={imageRef}
            onChange={handleImageChange}
          />
          <button className="focus:bg-zinc-400 rounded-full" type="button">
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
      {!forEditInfo ? (
        <>
          <JoinInputField
            title="이메일"
            placeholder="이메일을 입력하세요"
            register={{ ...register("email") }}
          />
          {errors.email && (
            <p className="text-red-600 font-bold">{errors.email.message}</p>
          )}
          <JoinInputField
            title="이름"
            placeholder="이름을 입력하세요"
            register={{ ...register("name") }}
          />

          {errors.name && (
            <p className="text-red-600 font-bold">{errors.name.message}</p>
          )}

          <div className="relative my-3">
            <JoinInputField
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
            {errors.password && (
              <p className="text-red-600 font-bold">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="relative my-3">
            <JoinInputField
              title="비밀번호 확인"
              placeholder="비밀번호를 한번더 입력하세요."
              register={{ ...register("passwordConfirmation") }}
              type={showPassword ? "text" : "password"}
            />

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
        </>
      ) : (
        <div></div>
      )}

      <label className="text-[#323232] flex flex-col font-bold my-1">
        주소
        <input
          type="text"
          placeholder="주소를 입력하세요"
          className="bg-[#e4e6e7] rounded-[6px] py-2 font-normal"
          value={location}
          disabled
        />
      </label>
      {clickSubmit && location.length === 0 && (
        <p className="text-red-600 font-bold">주소를 입력하세요</p>
      )}
      {!forEditInfo ? (
        <>
          <div>
            <input type="checkbox" id="isTrainer" {...register("sortRole")} />
            <label htmlFor="isTrainer" className="text-[#323232]">
              트레이너 입니다.
            </label>
          </div>
          {errors.sortRole && (
            <p className="text-red-600 font-bold">{errors.sortRole.message}</p>
          )}
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
}
