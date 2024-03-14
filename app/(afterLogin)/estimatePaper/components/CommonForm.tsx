import TextField from "@/components/formElement/TextField";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { EstimateUserFormType } from "../zodEstimatePaper";
interface CommonFormProps {
  register: UseFormRegister<EstimateUserFormType>;
  errors: FieldErrors<EstimateUserFormType>;
}
export default function CommonForm({ register, errors }: CommonFormProps) {
  return (
    <>
      <TextField
        title="이름"
        placeholder="이름을 입력하세요"
        register={{ ...register("name") }}
        disable
      />
      {errors.name && (
        <p className="text-red-600 font-bold">{errors.name.message}</p>
      )}
      <TextField
        title="가격"
        placeholder="가격을 입력하세요"
        id="won"
        type="number"
        register={{ ...register("price") }}
      />
      {errors.price && (
        <p className="text-red-600 font-bold">{errors.price.message}</p>
      )}
      <TextField
        title="위치"
        placeholder="위치를 입력하세요"
        register={{ ...register("address") }}
      />
      {errors.address && (
        <p className="text-red-600 font-bold">{errors.address.message}</p>
      )}
    </>
  );
}
