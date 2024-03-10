import { SmallHeader } from "@/components/SmallHeader";
import { ReactNode } from "react";
import React from "react";
export default function ProgramManagementLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="bg-white h-screen">
      <SmallHeader title="프로그램 관리" />
      <div>{children}</div>
    </div>
  );
}
