import Header from "@/components/Header";
import { SmallHeader } from "@/components/SmallHeader";
import { ReactNode } from "react";

export default function introduceTrainerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <SmallHeader title="트레이너 소개" />
      <div>{children}</div>
    </>
  );
}
