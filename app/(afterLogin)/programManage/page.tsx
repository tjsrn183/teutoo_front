export const metadata: Metadata = {
  title: "프로그램 관리",
  description: "프로그램 관리",
};
import { ProgramManageComponent } from "./components/ProgramManageComponent";
import React from "react";
import TrainerProfile from "./components/TrainerProfile";
import { Metadata } from "next";

export default async function ProgramManagementPage() {
  return (
    <div className="  bg-white flex flex-col">
      <TrainerProfile />
      <ProgramManageComponent />
    </div>
  );
}
