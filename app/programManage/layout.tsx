import Header from "../../components/Header";
import { ReactNode } from "react";

export default function ProgramManagementLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="bg-white ">
      <Header />
      <div>{children}</div>
    </div>
  );
}
