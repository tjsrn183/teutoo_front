import { SmallHeader } from "@/components/SmallHeader";
import EstimateFormUser from "../components/EstimateFormUser";
export default function EstimateUserPage() {
  return (
    <div className=" flex flex-col justify-center h-full">
      <SmallHeader title="신청서 작성" />
      <div className=" w-full h-full bg-gray-200 flex items-center justify-center">
        <EstimateFormUser />
      </div>
    </div>
  );
}
