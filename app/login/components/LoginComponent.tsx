import SocialLoginButtons from "./SocialLoginButtons";
import LoginForm from "./LoginForm";

export default function LoginComponent() {
  return (
    <div className="flex flex-col h-screen bg-white mx-auto">
      <h1 className="flex-1 flex justify-center text-[#323232]  text-center items-center text-[32px] font-bold">
        로그인
      </h1>
      <LoginForm />
      <div className="flex flex-1 text-[24px] text-[#175601] items-center justify-center border-y-slate-200 border-2">
        <div>회원가입</div>
      </div>
      <SocialLoginButtons />
    </div>
  );
}
