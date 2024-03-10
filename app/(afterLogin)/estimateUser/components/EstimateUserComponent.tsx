import BlankEstimate from "./BlankEstimate";
import EstimateButton from "./EstimateButton";
import EstimateList from "./EstimateList";

export default function EstimateUserComponent() {
  return (
    <div className="flex flex-col">
      <BlankEstimate />
      <div className=" flex justify-end relative right-5 ">
        <EstimateButton content="신청서" />
      </div>
      <div className=" relative">
        <EstimateList />
      </div>
    </div>
  );
}
