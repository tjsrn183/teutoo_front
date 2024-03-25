import { SmallHeader } from "@/components/SmallHeader";
import { ReactNode } from "react";
import React from "react";
import { sendRequest } from "@/app/api/rootApi";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getTrainerIntro } from "../introduceTrainer/layout";
import { redirect } from "next/navigation";

export const fetchTrainerProgram = async () => {
  return await sendRequest("trainer/program/me", "get");
};

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
  console.log("queryclient", queryClient.getQueryData(["trainerIntro"]));
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
