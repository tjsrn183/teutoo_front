import naver from "../../public/socialLogin/naver.png";
import Image from "next/image";
import kakao from "../../public/socialLogin/kakao.png";
import visible from "../../public/visible.png";

export default function Login() {
  return (
    <div className="flex flex-col h-screen bg-white max-w-md mx-auto">
      <div className="flex-1 flex justify-center text-[#323232]  text-center items-center text-[32px] font-bold">
        로그인
      </div>
      <div className="flex flex-1 justify-center flex-col">
        <form className="flex flex-col">
          <label className="text-[#323232] flex flex-col">
            이메일
            <input type="text" placeholder="이메일을 입력하세요" />
          </label>
          <label className="text-[#323232] flex flex-col">
            비밀번호
            <input
              type="text"
              id="password"
              placeholder="비밀번호를 입력하세요"
            />
            <button>
              <Image src={visible} alt="visible" />
            </button>
          </label>
          <button className=" text-white bg-[#22C55E] rounded-[6px] w-full h-[48px] mx-4">
            로그인
          </button>
        </form>
      </div>
      <div className="flex flex-1 text-[24px] text-[#323232] items-center justify-center">
        <div>회원가입</div>
      </div>
      <div className="flex-1 text-center mx-4">
        <div className="text-[#22C55E]">or log in with:</div>
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
