import { z } from "zod";

export const zodLoginSchema = z.object({
  email: z.string().email({ message: "유효한 이메일 주소를 입력해주세요." }),
  password: z.string().min(4, { message: "비밀번호는 4글자 이상입니다." }),
});
