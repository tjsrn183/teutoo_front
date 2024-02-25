import Header from "@/components/Header";
import { ReactNode } from "react";

export default function introduceTrainerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
}
