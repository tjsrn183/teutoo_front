import Label from "@/components/common/label";
import TextField from "@/components/common/text-field";
import Description from "@/components/common/description";
import Button from "@/components/common/button";
import FixedBottom from "@/components/layout/fixed-bottom";

export default function PasswordForm() {
  return (
    <div className="">
      <div className="flex flex-col gap-8 m-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="new-password">새 비밀번호</Label>
          <TextField id="new-password" placeholder="새 비밀번호" />
          <Description>
            영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.
          </Description>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password-confirm">새 비밀번호 확인</Label>
          <TextField id="password-confirm" placeholder="새 비밀번호 확인" />
        </div>
      </div>
      <FixedBottom>
        <Button className="w-full">저장</Button>
      </FixedBottom>
    </div>
  );
}
