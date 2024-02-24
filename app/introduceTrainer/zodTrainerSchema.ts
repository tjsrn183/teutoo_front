import { z } from "zod";

export const zodTrainerSchema = z.object({
  simpleInfo: z.string().min(10, { message: "소개는 5글자이상 해주세요" }),
  title: z.string().min(1, { message: "제목을 입력해주세요" }),
  content: z.string().min(1, { message: "내용을 입력해주세요" }),
});
