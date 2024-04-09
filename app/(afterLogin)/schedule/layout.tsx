import { SmallHeader } from "@/components/SmallHeader";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { ReactNode } from "react";
import { getScheduleT } from "./api/getScheduleT";

export default async function ScheduleLayout({
  children,
}: {
  children: ReactNode;
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["scheduleT"],
    queryFn: getScheduleT,
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="min-h-screen  bg-gray-200 ">
        <SmallHeader title="PT 일정" />

        {children}
      </div>
    </HydrationBoundary>
  );
}
