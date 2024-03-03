import LightButton from "@/components/LightButton";
import FormInputElement from "./FormInputElement";

export default function EstimateFormTrainer() {
  return (
    <form className=" w-full flex flex-col justify-center items-center text-black h-full">
      <div className=" w-[80%] flex flex-col rounded-lg h-full justify-center">
        <div className="bg-white flex flex-col justify-center rounded-lg px-3">
          <FormInputElement title="이름" id="name" />
          <FormInputElement title="가격" id="price" />
          <FormInputElement
            title="프로그램 선택
      "
            id="programChoice"
          />
          <FormInputElement title="센터 위치" id="location" />
          <FormInputElement title="일정" id="shedule" />
          <LightButton type="button" className=" mt-2">
            일정추가
          </LightButton>
        </div>
      </div>

      <div className="  sticky bottom-4 flex justify-center w-full">
        <LightButton
          backgroundColor="bg-[#175601]"
          type="submit"
          width="w-[85%]"
        >
          견적서 작성완료
        </LightButton>
      </div>
    </form>
  );
}
