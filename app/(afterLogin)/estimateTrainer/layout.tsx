import BottomNavigationBar from "@/components/BottomNavigationBar";
import { ReactNode } from "react";

export default async function EstimateTrainerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className=" h-screen bg-gray-200">
      <div>{children}</div>
      <BottomNavigationBar />
    </div>
  );
}
