import { SmallHeader } from "@/components/SmallHeader";
import { ReactNode } from "react";
import React from "react";
import { sendRequest } from "@/app/api/rootApi";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
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
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="bg-white h-screen">
        <SmallHeader title="프로그램 관리" />
        <div>{children}</div>
      </div>
    </HydrationBoundary>
  );
}
