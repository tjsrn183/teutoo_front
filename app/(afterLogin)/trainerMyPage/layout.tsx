import { ReactNode } from "react";
import BottomNavigationBar from "@/components/BottomNavigationBar";
import { SmallHeader } from "@/components/SmallHeader";
export const metadata = {
  title: "마이페이지",
  description: "마이페이지",
};
export default async function trainerMyPageLayout({
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
