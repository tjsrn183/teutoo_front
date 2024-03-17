import { ArrowLeft } from "lucide-react";
import ProgramInfo from "./_components/program-info";
import AppBar from "@/components/common/app-bar";
import Button from "@/components/common/button";
import { Suspense } from "react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import getProgramInfo from "@/api/getProgramInfo";
interface ProgramDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ProgramDetailPage({
  params,
}: ProgramDetailPageProps): Promise<JSX.Element> {
  const id = parseInt(params.id);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["program", id],
    queryFn: () => getProgramInfo({ programId: id }),
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex flex-col">
        <AppBar className="absolute bg-transparent">
          <Button size="icon" variant="ghost">
            <ArrowLeft />
          </Button>
          <AppBar.Title className="sr-only">프로그램 상세</AppBar.Title>
        </AppBar>
        <Suspense fallback={<div>Loading...</div>}>
          <ProgramInfo programId={id} />
        </Suspense>
      </div>
    </HydrationBoundary>
  );
}
