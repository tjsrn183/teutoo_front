"use client";
import back from "@/public/back.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SmallHeaderProps {
  title: string;
  arrrowHidden?: boolean | undefined;
}

export const SmallHeader = ({ title, arrrowHidden }: SmallHeaderProps) => {
  const router = useRouter();
  const onClickBack = () => {
    router.back();
  };
  return (
    <header className=" text-black flex justify-start items-center w-full font-bold text-lg h-[55px] bg-white">
      <button onClick={onClickBack} type="button" hidden={arrrowHidden}>
        <Image src={back} alt="back" />
      </button>
      {arrrowHidden && <div className=" w-[42px]" />}
      {title}
    </header>
  );
};
