import Image from "next/image";
import home from "../public/bottomNavIcons/home.png";
import calc from "../public/bottomNavIcons/calc.png";
import me from "../public/bottomNavIcons/me.png";
import chat from "../public/bottomNavIcons/chat.png";
export default function BottomNavigationBar() {
  return (
    <div className=" fixed bottom-0 bg-white p-2 flex justify-around z-30 md:left-1/2 md:transform md:-translate-x-1/2">
      <button>
        <Image src={home} alt="home" />
      </button>
      <button>
        <Image src={calc} alt="calc" />
      </button>
      <button>
        <Image src={chat} alt="chat" />
      </button>
      <button>
        <Image src={me} alt="me" />
      </button>
    </div>
  );
}
