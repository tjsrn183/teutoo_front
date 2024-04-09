import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { SmallHeader } from "@/components/SmallHeader";
import EstimateFormTrainer from "../components/EstimateFormTrainer";
import { getOnlyTrainerPrograms } from "../api/getOnlyTrainerPrograms";
export default async function EstimateTrainerPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["onlytrainerProgram"],
    queryFn: getOnlyTrainerPrograms,
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <div className=" flex flex-col justify-center h-full">
      <SmallHeader title="견적서 작성" />
      <div className=" w-full h-full bg-gray-200 flex items-center">
        <HydrationBoundary state={dehydratedState}>
          <EstimateFormTrainer />
        </HydrationBoundary>
      </div>
    </div>
  );
}
