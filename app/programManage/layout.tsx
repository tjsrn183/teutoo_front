import { SmallHeader } from "@/components/SmallHeader";
import Header from "../../components/Header";
import { ReactNode } from "react";

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
