import { sendRequest } from "@/app/api/rootApi";
import BottomNavigationBar from "@/components/BottomNavigationBar";
import { ReactNode } from "react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
export interface getTrainerEstimates {
  pageParams: Array<number>;
  pages: Array<EstimateItemT>;
}
export interface EstimateItemT {
  data: Array<EstimateItemAtom>;
}
export interface EstimateItemAtom {
  price: number;
  name: string;
  profileImagePath?: string;
}

export const fetchInfiniteEstimateU = async ({
  pageParam,
}: {
  pageParam: number;
}) => {
  return await sendRequest(
    `trainer/estimates?cursorId=${pageParam}&size=5`,
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
    queryFn: fetchInfiniteEstimateU,
    initialPageParam: 0,
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className=" min-h-screen bg-gray-200">
        <div>{children}</div>
        <BottomNavigationBar />
      </div>
    </HydrationBoundary>
  );
}
