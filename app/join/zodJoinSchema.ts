import { z } from "zod";

export const zodJoinSchema = z
  .object({
    email: z.string().email({ message: "유효한 이메일을 입력하세요" }),
    name: z.string().min(1, { message: "이름을 입력하세요" }),
    password: z.string().min(4, { message: "비밀번호는 네글자 이상입니다." }),
    passwordConfirmation: z.string(),
    address: z.string().min(1, { message: "주소는 필수입니다." }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "비밀번호가 다릅니다.",
    path: ["passwordConfirmation"],
  });
