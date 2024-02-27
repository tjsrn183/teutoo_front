import Header from "../../components/Header";
import { ReactNode } from "react";

export default function trainerMyPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className=" md:max-w-md">
      <Header />
      <div>{children}</div>
    </div>
  );
}
