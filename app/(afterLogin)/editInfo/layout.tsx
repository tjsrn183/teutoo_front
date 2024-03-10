import Header from "@/components/Header";
import { SmallHeader } from "@/components/SmallHeader";
import { ReactNode } from "react";

export default function editInfoLayout({
  children,
  editLocation,
}: {
  children: ReactNode;
  editLocation: ReactNode;
}) {
  return (
    <div className=" h-screen">
      <SmallHeader title="회원 정보 수정" />

      {editLocation}
      {children}
    </div>
  );
}
