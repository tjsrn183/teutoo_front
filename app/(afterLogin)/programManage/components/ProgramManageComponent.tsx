"use client";
import LightButton from "@/components/LightButton";
import { ProgramForm, ProgramFormType } from "./ProgramForm";
import { MutableRefObject, useState } from "react";
import React, { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface SubmitFunc {
  submitForm: () => void;
}
export interface getProgramList {
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
  // 사용자가 저장하기 버튼 클릭시 Submit을 트리거하기 위함
  const onSubmitTrigger = () => {
    formRefs.forEach((formRef) => {
      formRef.current?.submitForm();
    });
  };
  // 사용자가 프로그램 추가 버튼 클릭시 새로운 폼을 추가하기 위함
  const addForm = () => {
    const newRef = React.createRef<SubmitFunc>();
    const newComponent = <ProgramForm key={programForms.length} ref={newRef} />;
    setProgramForms([...programForms, newComponent]);
    setFormRefs([...formRefs, newRef]);
  };
  // 서버 data가 존재할시 새로운 프로그램 추가 시 새로운 ref 추가하기 위함
  const addRefsForExistingData = () => {
    if (data?.ptProgramResList) {
      const newRefs = data.ptProgramResList.map(() =>
        React.createRef<SubmitFunc>(),
      );
      setFormRefs((prevRefs) => [...prevRefs, ...newRefs]);
    }
  };

  // 마운트 시 미리 폼하나를 렌더링, 서버데이터가 존재할 시 ref를 마련해놓음
  useEffect(() => {
    data?.ptProgramResList.length && data?.ptProgramResList.length > 0
      ? ""
      : addForm();

    addRefsForExistingData();
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
        <ProgramForm
          programList={item}
          key={index}
          ref={formRefs[index]}
          fromServer
        />
      ))}
      {programForms.map((component, index) => (
        <ProgramForm
          key={index}
          ref={formRefs[index + (data?.ptProgramResList.length || 0)]}
        />
      ))}
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
