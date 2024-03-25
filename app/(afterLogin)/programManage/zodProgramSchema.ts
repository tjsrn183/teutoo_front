import { z } from "zod";

export const zodProgramSchema = z.object({
  title: z.string().min(3, { message: "제목을 입력하세요." }),
  content: z.string().min(1, { message: "내용을 입력하세요." }),
  price: z.preprocess((val) => {
    if (typeof val === "string") {
      const parsed = parseInt(val, 10);
      return isNaN(parsed) ? undefined : parsed;
    }
    return val;
  }, z.number().min(1, { message: "가격은 1원 이상이어야 합니다." })),
});
