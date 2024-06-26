import { SmallHeader } from "@/components/SmallHeader";
import { ReactNode } from "react";
import React from "react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchTrainerProgram } from "./api/fetchTrainerProgram";
import { getTrainerIntro } from "../introduceTrainer/api/getTrainerIntro";
import { redirect } from "next/navigation";
export default async function ProgramManagementLayout({
  children,
}: {
  children: ReactNode;
}) {
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
      <div className="bg-white h-screen">
        <SmallHeader title="프로그램 관리" />
        <div>{children}</div>
      </div>
    </HydrationBoundary>
  );
}
