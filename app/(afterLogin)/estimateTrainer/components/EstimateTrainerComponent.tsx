import BlankEstimate from "@/app/(afterLogin)/estimateUser/components/BlankEstimate";
import DropdownLocation from "./DropdownLocation";
import EstimateButton from "@/app/(afterLogin)/estimateUser/components/EstimateButton";
import EstimateTrainerList from "./EstimateTrainerList";
import Pagenation from "./Pagenation";
export default function EstimateTrainerComponent() {
  return (
    <div>
      <BlankEstimate />

      <div className="flex justify-between mx-2 ">
        <DropdownLocation />
        <EstimateButton content="견적서" />
      </div>
      <EstimateTrainerList />
      <div className="pb-[70px]">
        <Pagenation
          totalItems={70}
          currentPage={1}
          pageCount={5}
          itemCountPerPage={10}
        />
      </div>
    </div>
  );
}
/*
  <Pagenation    totalItems={totalBooks}
          currentPage={page && parseInt(page) > 0 ? parseInt(page) : 1}
          pageCount={5}
          itemCountPerPage={50} />
*/
