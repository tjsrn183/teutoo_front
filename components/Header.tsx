import Link from "next/link";
export default function Header() {
  return (
    <div className="relative h-[50px] flex justify-center align-middle text-[#22C55E] text-[32px] bg-white font-bold font-sans drop-shadow-xl rounded-xl  ">
      <header>
        <Link href="/">나트</Link>
      </header>
    </div>
  );
}
