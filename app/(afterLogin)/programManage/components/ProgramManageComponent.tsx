"use client";
import LightButton from "@/components/LightButton";
import { ProgramForm } from "./ProgramForm";
import { useState } from "react";
import React from "react";
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
      <div className=" flex justify-center mx-2">
        <LightButton className="text-base " height="h-[40px]" onClick={addForm}>
          +프로그램 추가하기
        </LightButton>
      </div>

      {programForms.map((component) => component)}
      <div className=" flex justify-center sticky bottom-2 right-3 left-3 ">
        <button className="m-2 h-[48px] bg-[#1C743C] rounded-[6px] w-full sticky text-white">
          저장하기
        </button>
      </div>
    </div>
  );
};
