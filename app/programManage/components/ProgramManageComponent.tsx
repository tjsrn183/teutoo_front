"use client";
import Button from "@/components/Button";
import { ProgramForm } from "./ProgramForm";
import { useState } from "react";

export const ProgramManageComponent = () => {
  const [programForms, setProgramForms] = useState<Array<React.ReactElement>>([
    <ProgramForm key={0} />,
  ]);

  const addForm = () => {
    const newComponent = <ProgramForm key={programForms.length} />;
    setProgramForms([...programForms, newComponent]);
  };

  return (
    <div className=" px-3  bg-white">
      <div className="flex flex-col items-center">
        <div className="bg-slate-500 h-[90px] w-[90px] rounded-full mb-2" />
        <div className="text-black text-xl">안녕하세요 트레이너님!</div>
      </div>
      <Button className="text-base" height="h-[40px]" onClick={addForm}>
        +프로그램 추가하기
      </Button>
      {programForms.map((component) => component)}

      <div className=" flex justify-center sticky bottom-1 right-3 left-3 ">
        <button className=" h-[48px] bg-[#1C743C] rounded-[6px] w-full sticky">
          저장하기
        </button>
      </div>
    </div>
  );
};
