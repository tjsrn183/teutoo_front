import { z } from "zod";

export const zodTrainerSchema = z.object({
  simpleInfo: z.string().min(10, { message: "소개는 5글자이상 해주세요" }),
  content: z.string().min(5, { message: "내용을 5글자이상 입력하세요" }),
  gymName: z.string().min(5, { message: "소개는 5글자이상 해주세요" }),
});
