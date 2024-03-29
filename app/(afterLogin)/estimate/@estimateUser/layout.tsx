import { sendRequest } from "@/app/api/rootApi";
import { ReactNode } from "react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export const fetchInfiniteEstimateT = async ({
  pageParam,
}: {
  pageParam: number;
}) => {
  return await sendRequest(
    `user/estimates?courseId=${pageParam}&size=5`,
    "get",
  );
};

export default async function EstimateUserLayout({
  children,
}: {
  children: ReactNode;
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["trainerEstimates"],
    queryFn: fetchInfiniteEstimateT,
    initialPageParam: 0,
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className=" min-h-screen bg-gray-200">
        <div>{children}</div>
      </div>
    </HydrationBoundary>
  );
}
