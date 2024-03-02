import BottomNavigationBar from "@/components/BottomNavigationBar";
import { ReactNode } from "react";

export default function EstimateUserLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <div className=" bg-gray-200 h-screen">{children}</div>
      <BottomNavigationBar />
    </>
  );
}
