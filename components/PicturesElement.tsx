"use client";
import Image from "next/image";
import { Dispatch, SetStateAction, ChangeEventHandler, useRef } from "react";
import { BGWhiteButton } from "./BGWhiteButton";
import close from "@/public/join/close.png";
export interface Picture {
  dataUrl: string;
  file: File;
}
interface PictureElementProps {
  pictureArr: Picture[] | null;
  setPictureArr: Dispatch<SetStateAction<Array<Picture>>>;
}

export const PicturesElement = ({
  pictureArr,
  setPictureArr,
}: PictureElementProps) => {
  const imgRef = useRef<HTMLInputElement>(null);
  const onRemoveImage = (index: number) => () => {
    setPictureArr((prevPreview) =>
      prevPreview.filter((_, idx) => idx !== index),
    );
  };
  const onClickPicture = () => {
    imgRef.current?.click();
  };
  const onChangePicture: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      const fileReaders = Array.from(e.target.files).map((file) => {
        return new Promise<{ dataUrl: string; file: File }>(
          (resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              console.log("file이야우아", file);
              resolve({
                dataUrl: reader.result as string,
                file,
              });
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
          },
        );
      });

      Promise.all(fileReaders)
        .then((files) => {
          setPictureArr((prevPreview) => [...prevPreview, ...files]);
        })
        .catch((error) => {
          console.error("Error reading files: ", error);
        });
    }
  };

  return (
    <div>
      <div className="flex flex-wrap">
        {pictureArr?.map(
          (v, index) =>
            v && (
              <div key={index} className=" w-[30%] p-1  relative">
                <button
                  className="absolute top-1 left-1"
                  onClick={onRemoveImage(index)}
                >
                  <Image src={close} alt="close" />
                </button>

                <img src={v.dataUrl} alt="미리보기" className="w-full h-full" />
              </div>
            ),
        )}
      </div>
      <input
        type="file"
        hidden
        multiple
        ref={imgRef}
        accept="image/*"
        onChange={onChangePicture}
        name="imageFiles"
      />

      <BGWhiteButton onClick={onClickPicture} text="+ 사진 추가하기" />
    </div>
  );
};
