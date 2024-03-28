import { SmallHeader } from "@/components/SmallHeader";
import { ReactNode } from "react";
import { getTrainerIntro } from "./api/getTrainerIntro";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
export const metadata = {
  title: "트레이너 소개",
  description: "트레이너 소개",
};

export default async function introduceTrainerLayout({
  children,
}: {
  children: ReactNode;
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["trainerIntro"],
    queryFn: getTrainerIntro,
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <SmallHeader title="트레이너 소개" />
      <div>{children}</div>
    </HydrationBoundary>
  );
}
