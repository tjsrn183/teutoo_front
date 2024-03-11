"use client";
import { ProgramFormType } from "@/app/(afterLogin)/programManage/components/ProgramForm";
import { Dispatch, SetStateAction } from "react";
import React from "react";
import {
  UseFormRegisterReturn,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
interface CountProps {
  setCount: Dispatch<SetStateAction<number>>;
  count: number;
  register?: UseFormRegisterReturn;
  setValue?: UseFormSetValue<ProgramFormType>;
  useReactHookForm?: boolean;
  watch?: UseFormWatch<ProgramFormType>;
}
export const NumberButton = ({
  setCount,
  count,
  register,
  setValue,
  watch,
  useReactHookForm,
}: CountProps) => {
  const increment = () => {
    if (setValue && watch) {
      let count = watch("count");
      setValue("count", ++count);
    } else {
      setCount(++count);
    }
  };
  const decrement = () => {
    if (setValue && watch) {
      let count = watch("count");
      setValue("count", --count);
    } else {
      setCount(--count);
    }
  };
  return (
    <div className="relative flex items-center mb-2 m-2 justify-between">
      {!useReactHookForm ? (
        <input
          type="text"
          id="numberInput"
          className=" bg-[#d0ecda] border-x-0 border-gray-300 h-11 font-medium text-center text-[#22C55E] text-sm  w-[50%] pb-6 py-5 rounded-lg"
          readOnly
          value={count}
        />
      ) : (
        <input
          type="text"
          id="formNumberInput"
          className=" bg-[#d0ecda] border-x-0 border-gray-300 h-11 font-medium text-center text-[#22C55E] text-sm  w-[50%] pb-6 py-5 rounded-lg"
          readOnly
          {...register}
        />
      )}

      <button
        type="button"
        id="decrement-button"
        onClick={decrement}
        className="bg-[#22C55E]   border  rounded-lg p-2 h-11 focus:ring-gray-100  focus:ring-2 focus:outline-none text-white w-[50px] mx-2"
      >
        -
      </button>
      <button
        type="button"
        id="increment-button"
        onClick={increment}
        className="bg-[#22C55E]   border  rounded-lg p-2 h-11 focus:ring-gray-100  focus:ring-2 focus:outline-none text-white w-[50px]"
      >
        +
      </button>
    </div>
  );
};
