import BottomNavigationBar from "@/components/BottomNavigationBar";

import { ReactNode } from "react";

export const metadata = {
  title: "신청서 목록",
  description: "신청서 목록",
};
export default function EstimateTrainerLayout({
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
