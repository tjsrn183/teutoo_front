"use client";
import LightButton from "@/components/LightButton";
import { ProgramForm, ProgramFormType } from "./ProgramForm";
import { MutableRefObject, useState } from "react";
import React, { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface SubmitFunc {
  submitForm: () => void;
}
interface getProgramList {
  ptProgramResList: Array<ProgramFormType>;
}
export const ProgramManageComponent = () => {
  const queryClient = useQueryClient();
  const data: getProgramList | undefined = queryClient.getQueryData([
    "trainerProgram",
  ]);
  const [formRefs, setFormRefs] = useState<
    MutableRefObject<SubmitFunc | undefined | null>[]
  >([]);

  const [programForms, setProgramForms] = useState<Array<JSX.Element>>([]);
  const onSubmitTrigger = () => {
    formRefs.forEach((formRef) => {
      formRef.current?.submitForm();
    });
  };
  const addForm = () => {
    const newRef = React.createRef<SubmitFunc>();
    const newComponent = <ProgramForm key={programForms.length} ref={newRef} />;
    setProgramForms([...programForms, newComponent]);
    setFormRefs([...formRefs, newRef]);
  };
  useEffect(() => {
    addForm();
  }, []);
  return (
    <div className=" px-3  bg-white">
      <div className=" flex justify-center mx-2">
        <LightButton
          className="text-base "
          height="h-[40px]"
          onClick={addForm}
          type="button"
        >
          +프로그램 추가하기
        </LightButton>
      </div>
      {data?.ptProgramResList.map((item, index) => (
        <ProgramForm programList={item} key={index} fromServer />
      ))}
      {programForms.map((component) => component)}
      <div className=" flex justify-center sticky bottom-2 right-3 left-3 ">
        <button
          className="m-2 h-[48px] bg-[#1C743C] rounded-[6px] w-full sticky text-white"
          type="submit"
          onClick={onSubmitTrigger}
        >
          저장하기
        </button>
      </div>
    </div>
  );
};
