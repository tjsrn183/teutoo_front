import LightButton from "@/components/LightButton";

import TextField from "@/components/formElement/TextField";

export default function EstimateFormTrainer() {
  return (
    <form className=" w-full flex flex-col justify-center items-center text-black h-full">
      <div className=" w-[80%] flex flex-col rounded-lg h-full justify-center">
        <div className="bg-white flex flex-col justify-center rounded-lg px-3">
          <TextField title="이름" />
          <TextField title="가격" type="number" id="won" />
          <TextField title="프로그램 선택" />
          <TextField title="센터 위치" />
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
