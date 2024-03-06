import Image from "next/image";
import kakao from "@/public/socialLogin/kakao.png";
import naver from "@/public/socialLogin/naver.png";
export default function SocialLoginButtons() {
  return (
    <div className="flex-1 text-center mx-4 my-9">
      <div className="text-[#22C55E] my-2">or log in with:</div>
      <button>
        <Image src={kakao} alt="kakao" width={328} height={48} />
      </button>
      <button>
        <Image src={naver} alt="naver" width={328} height={48} />
      </button>
    </div>
  );
}
