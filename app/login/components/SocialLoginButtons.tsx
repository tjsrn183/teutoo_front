import Image from "next/image";
import kakao_large from "@/public/socialLogin/kakao_login_large_wide.png";
import Link from "next/link";

export default function SocialLoginButtons() {
  return (
    <div className="flex-1 text-center mx-4 my-9 ">
      <div className="text-[#22C55E] my-2">or log in with:</div>
      <button className=" relative w-full h-[48px] flex">
        <Link
          href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=http://localhost:3000/login/kakao`}
        >
          <Image
            src={kakao_large}
            alt="kakao"
            layout="fill"
            objectFit="cover"
          />
        </Link>
      </button>
    </div>
  );
}
