import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { SmallHeader } from "@/components/SmallHeader";
import EstimateFormTrainer from "../components/EstimateFormTrainer";
import { sendRequest } from "@/app/api/rootApi";
export const metadata = {
  title: "견적서 작성",
  description: "견적서 작성",
};
const fetchOnlyTrainerPrograms = async () => {
  return await sendRequest("trainer/estimates/programs");
};
export default async function EstimateTrainerPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["onlytrainerProgram"],
    queryFn: fetchOnlyTrainerPrograms,
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
