import EstimateUserComponent from "./components/EstimateUserComponent";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "견적서 목록",
  description: "견적서 목록",
};

export default function EstimateUserPage() {
  return (
    <div>
      <EstimateUserComponent />
      <div className=" w-full h-[70px]"></div>
    </div>
  );
}
