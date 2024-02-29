"use client";
import React from "react";
import { NumberButton } from "@/components/NumberButton";
import { Picture, PicturesElement } from "@/components/PicturesElement";
import TextArea from "@/components/formElement/TextArea";
import TextField from "@/components/formElement/TextField";
import { useState } from "react";

export const ProgramForm = () => {
  const [count, setCount] = useState(1);
  const [pictureArr, setPictureArr] = useState<Array<Picture>>([]);

  return (
    <form className="flex flex-col border border-[#DDE1E6] m-2  rounded-[12px] p-3">
      <TextField
        title="프로그램 제목을 입력해주세요"
        placeholder="제목을 입력하세요"
      />
      <TextArea title="내용을 입력해주세요" placeholder="내용을 입력하세요" />
      <TextField title="가격" placeholder="가격을 입력하세요" type="number" />
      <label className="text-sm font-semibold text-black flex flex-col">
        횟수
        <NumberButton setCount={setCount} count={count} />
      </label>
      <PicturesElement pictureArr={pictureArr} setPictureArr={setPictureArr} />
    </form>
  );
};
