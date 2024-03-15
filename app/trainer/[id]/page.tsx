import { ArrowLeft, MoreVertical } from "lucide-react";
import TrainerInfo from "./_components/trainer-info";
import AppBar from "@/components/common/app-bar";
import Button from "@/components/common/button";
import FixedBottom from "@/components/layout/fixed-bottom";
import { Suspense } from "react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import getTrainerInfo from "@/api/getTrainerInfo";

interface TrainerDetailPageProps {
  params: {
    id: string;
  };
}

export default async function TrainerDetailPage({
  params,
}: TrainerDetailPageProps): Promise<JSX.Element> {
  const id = parseInt(params.id);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["trainerInfo", id],
    queryFn: () => getTrainerInfo({ trainerId: id }),
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex flex-col">
        <AppBar sticky>
          <Button size="icon" variant="ghost">
            <ArrowLeft />
          </Button>
          <AppBar.Title>트레이너 상세</AppBar.Title>
          <Button size="icon" variant="ghost">
            <MoreVertical />
          </Button>
        </AppBar>
        <Suspense fallback={<div>로딩중...</div>}>
          <TrainerInfo id={id} />
        </Suspense>
        <FixedBottom>
          <Button className="w-full">문의하기</Button>
        </FixedBottom>
      </div>
    </HydrationBoundary>
  );
}
