import AppBar from "@/components/common/app-bar";
import AddressMenu from "./_components/address-menu";
import Search from "@/components/common/search";
import TrainerList from "./_components/trainer-list";
import { Suspense } from "react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import getTrainerList from "@/api/getTrainerList";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["trainerList"],
    queryFn: () =>
      getTrainerList({ page: 0, size: 5, sort: "alpha", direction: "asc" }),
    initialPageParam: 0,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex flex-col">
        <AppBar sticky>
          <AddressMenu />
        </AppBar>
        <div className="p-2">
          <Search
            className="w-full"
            placeholder="트레이너, 헬스장 이름을 검색하세요..."
          />
          <div className="flex-auto h-full">
            <Suspense fallback={<div>Loading...</div>}>
              <TrainerList />
            </Suspense>
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
}
