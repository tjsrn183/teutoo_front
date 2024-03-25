import { ReactNode } from "react";
import { SmallHeader } from "@/components/SmallHeader";

export default function JoinLayout({
  children,
  location,
}: {
  children: ReactNode;
  location: ReactNode;
}) {
  return (
    <div className=" h-screen">
      <SmallHeader title="회원가입" />
      {location}
      {children}
    </div>
  );
}
