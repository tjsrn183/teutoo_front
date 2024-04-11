import AppBar from "@/components/common/app-bar";
import TrainerList from "./_components/trainer-list";
import { Suspense } from "react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import getTrainerList from "@/api/getTrainerList";
import SearchContainer from "@/app/_components/search-container";
import FixedBottom from "@/components/layout/fixed-bottom";
import BottomNavigationBar from "@/components/BottomNavigationBar";

interface HomeProps {
  searchParams: {
    sort: "alpha" | "review";
    direction: "asc" | "desc";
    search?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const sort = ["alpha", "review"].includes(searchParams.sort)
    ? searchParams.sort
    : "alpha";
  const direction = ["asc", "desc"].includes(searchParams.direction)
    ? searchParams.direction
    : "asc";
  const search = searchParams.search || undefined;

  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["trainerList", { page: 0, size: 10, sort, direction, search }],
    queryFn: () =>
      getTrainerList({
        page: 0,
        size: 10,
        sort,
        direction,
        search,
      }),
    initialPageParam: 0,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex flex-col">
        <AppBar sticky>
          {/* <AddressMenu /> */}
          <AppBar.Title>트레이너 찾기</AppBar.Title>
        </AppBar>
        <div className="p-2 pb-14">
          <SearchContainer sort={sort} direction={direction} search={search} />
          <div className="flex-auto h-full">
            <Suspense fallback={<div>Loading...</div>}>
              <TrainerList sort={sort} direction={direction} search={search} />
            </Suspense>
          </div>
        </div>
      </div>
      <FixedBottom>
        <BottomNavigationBar />
      </FixedBottom>
    </HydrationBoundary>
  );
}
