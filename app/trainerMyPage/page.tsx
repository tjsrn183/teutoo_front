import Image from "next/image";
import userThumb from "@/public/trainerMyPageIcons/userThumb.png";
import logout from "@/public/trainerMyPageIcons/logoutButton.png";
import infoEditButton from "@/public/trainerMyPageIcons/infoEditButton.png";
import schedule from "@/public/trainerMyPageIcons/schedule.png";
import programManage from "@/public/trainerMyPageIcons/programManage.png";
import trainerInfo from "@/public/trainerMyPageIcons/trainerInfo.png";

export default function TrainerMyPage() {
  return (
    <div className=" bg-white w-screen h-screen">
      <div className=" pt-14 text-black px-2">
        <div className="font-bold">마이페이지</div>

        <div className=" h-[80px] flex justify-around">
          <div className="flex">
            <Image src={userThumb} alt="userThumb"></Image>
          </div>
          <div className="flex flex-col">
            <div className=" flex justify-between items-center">
              <div className=" text-black text-[20px] font-bold">김헬창님</div>
              <button>
                <Image src={infoEditButton} alt="infoEditButton" />
              </button>
              <button className=" bg-[#22C55E] rounded-[12px] w-[40px] h-[40px] flex justify-center items-center">
                <Image src={logout} alt="logout" />
              </button>
            </div>
            <div className="text-[12px] text-slate-400">gymgym12@naver.com</div>
          </div>
        </div>
        <div className=" flex my-5">
          <button className=" flex-1 m-2">
            <Image src={schedule} alt="schedule" />
          </button>
          <button className=" flex-1 m-2">
            <Image src={programManage} alt="programManage" />
          </button>
          <button className=" flex-1 m-2">
            <Image src={trainerInfo} alt="trainerInfo" />
          </button>
        </div>
      </div>
    </div>
  );
}
