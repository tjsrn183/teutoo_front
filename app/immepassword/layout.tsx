import { SmallHeader } from "@/components/SmallHeader";
import { ReactNode } from "react";

export default function ImmePasswordLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="h-screen  bg-gray-200 flex flex-col justify-center">
      <div className=" absolute top-0 w-full">
        <SmallHeader title="비밀번호 초기화" />
      </div>

      <div className=" flex flex-col justify-center items-center">
        {children}
      </div>
    </div>
  );
}
