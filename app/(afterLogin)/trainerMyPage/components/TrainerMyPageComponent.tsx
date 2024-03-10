import MyInfoChunk from "./MyInfoChunk";
import ButtonMass from "./ButtonMass";

export default function TrainerMyPageComponent() {
  return (
    <div className=" bg-white px-2">
      <div className="  text-black px-2">
        <MyInfoChunk />
        <div className=" flex my-3">
          <ButtonMass />
        </div>
      </div>
    </div>
  );
}
