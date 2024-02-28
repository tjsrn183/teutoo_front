import Header from "../../components/Header";
import { ReactNode } from "react";
import BottomNavigationBar from "../../components/BottomNavigationBar";
import { SmallHeader } from "@/components/SmallHeader";

export default function trainerMyPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className=" md:max-w-md h-screen">
      <SmallHeader title="마이페이지" arrrowHidden />
      <div>{children}</div>
      <BottomNavigationBar />
    </div>
  );
}
