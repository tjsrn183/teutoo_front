import { z } from "zod";

export const zodEditInfoSchema = z
  .object({
    email: z.string().email({ message: "유효한 이메일을 입력하세요." }),
    name: z.string().min(1, { message: "이름을 입력하세요." }),
    password: z.string().min(4, { message: "비밀번호는 네글자 이상입니다." }),
    passwordConfirmation: z.string(),
    sortRole: z.boolean(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "비밀번호가 다릅니다.",
    path: ["passwordConfirmation"],
  });
