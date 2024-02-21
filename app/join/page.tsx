import JoinForm from "./components/JoinForm";

export default function Join() {
  return (
    <div className="flex flex-col bg-white h-screen items-center">
      <h1 className="text-[#323232] text-center text-[32px] font-bold mt-9">
        회원가입
      </h1>
      <JoinForm />
    </div>
  );
}
