import { SmallHeader } from "@/components/SmallHeader";
import EstimateFormTrainer from "../components/EstimateFormTrainer";
export default function EstimateTrainerPage() {
  return (
    <div className=" flex flex-col justify-center h-full">
      <SmallHeader title="견적서 작성" />
      <div className=" w-full h-full bg-gray-200 flex items-center">
        <EstimateFormTrainer />
      </div>
    </div>
  );
}
