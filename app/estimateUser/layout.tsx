import BottomNavigationBar from "@/components/BottomNavigationBar";
import { ReactNode } from "react";

export default function EstimateUserLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className=" h-screen">
      <div className=" bg-gray-200">{children}</div>
      <BottomNavigationBar />
    </div>
  );
}
