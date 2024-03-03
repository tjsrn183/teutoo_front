"use client";
import { NumberButton } from "@/components/NumberButton";
import FormInputElement from "./FormInputElement";
import { useState } from "react";
import LightButton from "@/components/LightButton";
export default function EstimateFormUser() {
  const [count, setCount] = useState(0);
  return (
    <form className=" w-[80%] flex flex-col justify-center items-center text-black h-full">
      <div className="bg-white flex flex-col px-4 rounded-md py-4">
        <FormInputElement title="이름" id="name" />
        <FormInputElement title="가격" id="price" />

        <FormInputElement title="위치" id="location" />
        <span className=" text-black font-semibold text-sm">횟수</span>
        <NumberButton count={count} setCount={setCount} />
      </div>

      <LightButton
        backgroundColor="bg-[#175601]"
        type="submit"
        className=" mt-2"
      >
        신청서 작성완료
      </LightButton>
    </form>
  );
}
