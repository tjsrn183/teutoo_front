import ProgramInfo from "./_components/program-info";
import AppBar from "@/components/common/app-bar";
import { Suspense } from "react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import getProgramInfo from "@/api/getProgramInfo";
import BackButton from "@/components/BackButton";
import { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants/site";
interface ProgramDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: ProgramDetailPageProps): Promise<Metadata> {
  const id = parseInt(params.id);

  const programInfo = await getProgramInfo({ programId: id });
  const images = programInfo.ptProgramImgList[0]?.imgUrl;
  return {
    title: `${programInfo.title} 프로그램 - ${SITE_NAME}`,
    description: `${programInfo.title} 프로그램 상세 페이지입니다.`,
    openGraph: {
      images: images ? [{ url: images }] : undefined,
    },
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
          <BackButton />
          <AppBar.Title className="sr-only">프로그램 상세</AppBar.Title>
        </AppBar>
        <Suspense fallback={<div>Loading...</div>}>
          <ProgramInfo programId={id} />
        </Suspense>
      </div>
    </HydrationBoundary>
  );
}
