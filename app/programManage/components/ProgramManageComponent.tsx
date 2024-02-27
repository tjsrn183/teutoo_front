"use client";
import Link from "next/link";
import back from "@/public/back.png";
import Image from "next/image";
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
    <div className="py-[20px] px-3  bg-white">
      <div className="flex">
        <Link href="../../trainerMyPage">
          <Image src={back} alt="back" width={30} height={30} />
        </Link>
        <span className="text-black text-lg">프로그램 관리</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-slate-500 h-[90px] w-[90px] rounded-full mb-2" />
        <div className="text-black text-xl">안녕하세요 트레이너님!</div>
      </div>
      <Button className="text-base" height="h-[40px]" onClick={addForm}>
        +프로그램 추가하기
      </Button>
      {programForms.map((component) => component)}
      <div className="pb-[50px]" />
    </div>
  );
};
