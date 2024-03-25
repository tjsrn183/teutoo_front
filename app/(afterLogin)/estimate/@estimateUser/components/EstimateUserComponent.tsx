import EstimateButton from "./EstimateButton";
import EstimateList from "./EstimateList";
import MyEstimateT from "./MyEstimateT";

export default function EstimateUserComponent() {
  return (
    <div className="flex flex-col">
      <MyEstimateT />

      <div className=" flex justify-end relative right-5 ">
        <EstimateButton content="신청서" />
      </div>
      <div className=" relative">
        <EstimateList />
      </div>
    </div>
  );
}
