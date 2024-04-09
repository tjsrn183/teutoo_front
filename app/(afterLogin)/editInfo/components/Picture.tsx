"use client";
import Image from "next/image";
import plus from "@/public/join/plus.png";
import { ChangeEventHandler, useRef } from "react";
import userThumb from "@/public/trainerMyPageIcons/userThumb.png";

interface PictureProps {
  selectedImage: string | undefined;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | undefined>>;
  setImageTarget: React.Dispatch<React.SetStateAction<File | null | undefined>>;
}

// 프로필 사진 선택 및 변경 컴포넌트
// 선택된 사진이 있으면 프로필 사진 출력
// 선택된 사진이 없으면 빈 사진 출력
// 사진 선택 버튼 클릭 시 사진 선택 창 열림

export default function Picture({
  selectedImage,
  setSelectedImage,
  setImageTarget,
}: PictureProps) {
  const imageRef = useRef<HTMLInputElement>(null);
  const onClickPictureButton = () => {
    imageRef.current?.click();
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
    <div className="flex flex-row justify-center">
      {selectedImage ? (
        <Image
          src={selectedImage}
          alt="profile_image"
          className="rounded-full w-24 h-24"
          width={96}
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
  );
}
