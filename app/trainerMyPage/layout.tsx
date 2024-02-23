import Header from "../../components/Header";
import { ReactNode } from "react";

export default function trainerMyPageLayout({
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
