import { ProgramManageComponent } from "./components/ProgramManageComponent";
import React from "react";
import TrainerProfile from "./components/TrainerProfile";
export default function ProgramManagementPage() {
  return (
    <div className="  bg-white flex flex-col">
      <TrainerProfile />
      <ProgramManageComponent />
    </div>
  );
}
