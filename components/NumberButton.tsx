"use client";
import { Dispatch, SetStateAction } from "react";
interface CountProps {
  setCount: Dispatch<SetStateAction<number>>;
  count: number;
}
export const NumberButton = ({ setCount, count }: CountProps) => {
  const decrement = () => {
    setCount((prevCount) => Math.max(prevCount - 1, 1));
  };

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };
  return (
    <div className="relative flex items-center mb-2 m-2">
      <input
        type="text"
        value={count}
        id="bedrooms-input"
        className=" bg-[#d0ecda] border-x-0 border-gray-300 h-11 font-medium text-center text-[#22C55E] text-sm  w-[50%] pb-6 py-5 rounded-lg"
        readOnly
      />
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
