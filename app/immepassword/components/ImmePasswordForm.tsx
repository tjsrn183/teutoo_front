"use client";
import LightButton from "@/components/LightButton";
import PWInputField from "./PWInputField";
import { useImmePassword } from "../api/useImmePassword";
import { useState } from "react";

export default function ImmePasswordForm() {
  const pwMutaion = useImmePassword();
  const [pw, setPw] = useState<string>("");

  const onClick = () => {
    if (pw) {
      const dataObj = new URLSearchParams();
      dataObj.append("email", pw);
      pwMutaion.mutate(dataObj);
    } else {
      alert("이메일을 입력해주세요");
    }
  };
  return (
    <div className="px-2 w-[90%] bg-white drop-shadow-2xl rounded-[12px]  h-[220px] ">
      <div className="flex flex-col justify-between py-3 h-full">
        <div>
          <div className=" font-bold text-l mb-1">
            이메일 주소로 임시 비밀번호 전송하기
          </div>
          <div className=" text-xs">
            가입하신 이메일로 임시 비밀번호를 전송해 드립니다.
            <br />
            임시 비밀번호로 로그인 후 비밀번호 변경을 해주시기를 바랍니다.
          </div>
        </div>

        <form>
          <PWInputField setState={setPw} state={pw} />
          <div className=" h-3"></div>
          <LightButton height="h-[40px]" onClick={onClick}>
            임시 비밀번호 전송
          </LightButton>
        </form>
      </div>
    </div>
  );
}
