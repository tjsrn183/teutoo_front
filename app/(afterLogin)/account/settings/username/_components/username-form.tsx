import Button from "@/components/common/button";
import Description from "@/components/common/description";
import Label from "@/components/common/label";
import TextField from "@/components/common/text-field";
import FixedBottom from "@/components/layout/fixed-bottom";

export default function UsernameForm(): JSX.Element {
  return (
    <div>
      <div className="flex flex-col gap-8 m-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="new-password">유저 이름</Label>
          <TextField id="new-password" placeholder="유저 이름" />
          <Description>8자 이하의 유저 이름을 입력해주세요.</Description>
        </div>
      </div>
      <FixedBottom>
        <Button className="w-full">저장</Button>
      </FixedBottom>
    </div>
  );
}
