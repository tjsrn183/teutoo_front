import { z } from "zod";

export interface EstimateUserFormType {
  name: string;
  price: number;
  address: string;
}
export const zodEstimatePaper = z.object({
  name: z.string().min(1, { message: "이름을 입력하세요." }),
  price: z.preprocess((val) => {
    if (typeof val === "string") {
      const parsed = parseInt(val, 10);
      return isNaN(parsed) ? 0 : parsed;
    }
    return typeof val === "number" ? val : 0;
  }, z.number().min(1, { message: "가격은 1원 이상이어야 합니다." })),
  address: z.string().min(1, { message: "주소를 입력하세요." }),
});
