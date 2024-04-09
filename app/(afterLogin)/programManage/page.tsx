export const metadata: Metadata = {
  title: "프로그램 관리",
  description: "프로그램 관리",
};
import { ProgramManageComponent } from "./components/ProgramManageComponent";
import React from "react";
import TrainerProfile from "./components/TrainerProfile";
import { Metadata } from "next";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchTrainerProgram } from "./api/fetchTrainerProgram";
import { getTrainerIntro } from "../introduceTrainer/api/getTrainerIntro";
import { redirect } from "next/navigation";
export default async function ProgramManagementPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["trainerProgram"],
    queryFn: fetchTrainerProgram,
  });
  await queryClient.prefetchQuery({
    queryKey: ["trainerIntro"],
    queryFn: getTrainerIntro,
  });
  const dehydratedState = dehydrate(queryClient);

  if (!queryClient.getQueryData(["trainerIntro"])) {
    redirect("/introduceTrainer");
  }
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="  bg-white flex flex-col">
        <TrainerProfile />
        <ProgramManageComponent />
      </div>
    </HydrationBoundary>
  );
}
