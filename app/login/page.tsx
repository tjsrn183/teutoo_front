import naver from "../../public/socialLogin/naver.png";
import Image from "next/image";
import kakao from "../../public/socialLogin/kakao.png";
import LoginForm from "./components/LoginForm";

export default function Login() {
  return (
    <div className="flex flex-col h-screen bg-white max-w-md mx-auto">
      <div className="flex-1 flex justify-center text-[#323232]  text-center items-center text-[32px] font-bold">
        로그인
      </div>
      <LoginForm />
      <div className="flex flex-1 text-[24px] text-[#175601] items-center justify-center border-y-slate-200 border-2">
        <div>회원가입</div>
      </div>
      <div className="flex-1 text-center mx-4 my-9">
        <div className="text-[#22C55E] my-2">or log in with:</div>
        <button>
          <Image src={kakao} alt="kakao" />
        </button>
        <button>
          <Image src={naver} alt="naver" />
        </button>
      </div>
    </div>
  );
}
