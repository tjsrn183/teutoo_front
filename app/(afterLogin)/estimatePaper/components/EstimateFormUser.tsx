"use client";
import { NumberButton } from "@/components/NumberButton";

import { useState } from "react";
import LightButton from "@/components/LightButton";
import TextField from "@/components/formElement/TextField";
export default function EstimateFormUser() {
  const [count, setCount] = useState(0);
  return (
    <form className=" w-[80%] flex flex-col justify-center items-center text-black h-full">
      <div className="bg-white flex flex-col px-4 rounded-md py-4">
        <TextField title="이름" placeholder="이름을 입력하세요" />
        <TextField
          title="가격"
          placeholder="가격을 입력하세요"
          id="won"
          type="number"
        />
        <TextField title="위치" placeholder="위치를 입력하세요" />
        <span className=" text-black font-semibold text-sm">횟수</span>
        <NumberButton count={count} setCount={setCount} />
      </div>

      <LightButton
        backgroundColor="bg-[#175601]"
        type="submit"
        className=" mt-7"
      >
        신청서 작성완료
      </LightButton>
    </form>
  );
}
