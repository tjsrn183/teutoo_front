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
import SearchContainer from "@/app/_components/search-container";

interface HomeProps {
  searchParams: {
    sort: "alpha" | "review";
    direction: "asc" | "desc";
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const sort = ["alpha", "review"].includes(searchParams.sort)
    ? searchParams.sort
    : "alpha";
  const direction = ["asc", "desc"].includes(searchParams.direction)
    ? searchParams.direction
    : "asc";

  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["trainerList"],
    queryFn: () => getTrainerList({ page: 0, size: 5, sort, direction }),
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
          <SearchContainer sort={sort} direction={direction} />
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
