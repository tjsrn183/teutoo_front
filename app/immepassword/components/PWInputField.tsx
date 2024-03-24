export interface InputProps {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}
export default function PWInputField({ state, setState }: InputProps) {
  return (
    <input
      type="text"
      placeholder="이메일 주소"
      className="w-full text-[#697077] pl-2 h-[40px] border border-[#d9d9d9] rounded-[6px]  focus:outline-none focus:ring-0 focus:border-[#22C55E] hover:border-[#22C55E] transition-colors duration-500 "
      value={state}
      onChange={(e) => setState(e.target.value)}
    />
  );
}
