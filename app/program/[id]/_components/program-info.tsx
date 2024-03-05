"use client";
import Button from "@/components/common/button";
import FixedBottom from "@/components/layout/fixed-bottom";
import React from "react";

const PROGRAM_DATA = {
  name: "프로그램 이름",
  description: `프로그램 설명 프로그램 설명 프로그램 설명 프로그램 설명 프로그램 설명 프로그램 설명 프로그램 설명 프로그램 설명 프로그램 설명 프로그램 설명 프로그램 설명 프로그램 설명 프로그램 설명 프로그램 설명 프로그램 설명 프로그램 설명 프로그램 설명 프로그램 설명 프로그램 설명 프로그램 설명`,
  imageUrl: "https://placehold.co/600x400",
  options: [
    {
      id: 1,
      name: "옵션1",
      price: 10000,
      description:
        "옵션 설명입니다. 옵션 설명입니다. 옵션 설명입니다. 옵션 설명입니다. 옵션 설명입니다.",
    },
    {
      id: 2,
      name: "옵션2",
      price: 20000,
      description:
        "옵션 설명입니다. 옵션 설명입니다. 옵션 설명입니다. 옵션 설명입니다. 옵션 설명입니다.",
    },
    {
      id: 3,
      name: "옵션3",
      price: 30000,
      description:
        "옵션 설명입니다. 옵션 설명입니다. 옵션 설명입니다. 옵션 설명입니다. 옵션 설명입니다.",
    },
  ],
};

export default function ProgramInfo(): JSX.Element {
  const [selectedOption, setSelectedOption] = React.useState(
    PROGRAM_DATA.options[0],
  );
  return (
    <div>
      <div className="pt-0 pb-24">
        <img src={PROGRAM_DATA.imageUrl} />
        <div className="p-4">
          <div>
            <h2 className="text-xl font-semibold">{PROGRAM_DATA.name}</h2>
            <p className="text-sm text-neutral-500">
              {PROGRAM_DATA.description}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold my-4">옵션</h3>
            <div className="flex flex-col gap-4">
              {PROGRAM_DATA.options.map((option) => (
                <div
                  key={option.id}
                  className={`flex flex-col gap-2 p-4 rounded-lg border ${
                    selectedOption.id === option.id
                      ? "border-green-500"
                      : "border-neutral-200 "
                  }`}
                  onClick={() => setSelectedOption(option)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="relative h-6 w-6 flex items-center justify-center">
                        <input
                          type="radio"
                          name="option"
                          checked={selectedOption.id === option.id}
                          onChange={() => setSelectedOption(option)}
                          className="peer/draft w-full h-full appearance-none border-neutral-300 border bg-white rounded-full"
                        />
                        <span className="hidden peer-checked/draft:block absolute w-3 h-3 bg-green-500 left-1.5 top-1.5 rounded-full" />
                      </div>
                      {option.name}
                    </div>
                    <span className="font-semibold">
                      {option.price.toLocaleString()}원
                    </span>
                  </div>
                  <p className="text-sm text-neutral-500">
                    {option.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <FixedBottom>
        <Button className="w-full">구매하기</Button>
      </FixedBottom>
    </div>
  );
}
