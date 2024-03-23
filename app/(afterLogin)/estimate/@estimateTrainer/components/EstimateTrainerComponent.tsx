import EstimateButton from "../../@estimateUser/components/EstimateButton";
import EstimateTrainerList from "./EstimateTrainerList";
import InputLocation from "./InputLocation";
import MyEstimateU from "./MyEstimateU";

export default function EstimateTrainerComponent() {
  return (
    <div>
      <MyEstimateU />
      <div className="flex justify-between mx-5 ">
        <InputLocation />
        <EstimateButton content="견적서" />
      </div>
      <EstimateTrainerList />
      <div></div>
    </div>
  );
}
