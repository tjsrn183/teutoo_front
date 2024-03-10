import { z } from "zod";

export const zodTrainerSchema = z.object({
  simpleInfo: z.string().min(3, { message: "소개를 더 해주세요" }),
  content: z.string().min(3, { message: "내용을 더 입력하세요" }),
  gymName: z.string().min(3, { message: "소개는 더 해주세요" }),
});
