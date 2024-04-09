"use client";
import userThumb from "@/public/trainerMyPageIcons/userThumb.png";
import Image from "next/image";
import plus from "@/public/join/plus.png";
import { useRef, ChangeEventHandler } from "react";
interface ImageProps {
  selectedImage: string | undefined; //미리보기 이미지가 저장된 useState
  setSelectedImage: React.Dispatch<React.SetStateAction<string | undefined>>; //이미지 미리보기를 위해 이미지를 저장하는 useState함수
  setImageTarget: React.Dispatch<React.SetStateAction<File | null | undefined>>;
}
export default function ProfileImg({
  selectedImage,
  setSelectedImage,
  setImageTarget,
}: ImageProps) {
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
  );
}
