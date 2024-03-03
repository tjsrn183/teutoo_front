import Image from "next/image";
import userThumb from "@/public/trainerMyPageIcons/userThumb.png";
import logout from "@/public/trainerMyPageIcons/logoutButton.png";
import infoEditButton from "@/public/trainerMyPageIcons/infoEditButton.png";
import schedule from "@/public/trainerMyPageIcons/schedule.png";
import programManage from "@/public/trainerMyPageIcons/programManage.png";
import trainerInfo from "@/public/trainerMyPageIcons/trainerInfo.png";

export default function TrainerMyPage() {
  return (
    <div className=" bg-white px-2">
      <div className="  text-black px-2">
        <div className=" flex">
          <div className="flex">
            <Image src={userThumb} alt="userThumb"></Image>
          </div>
          <div className="flex flex-col w-full">
            <div className=" flex justify-between items-center">
              <div className=" text-black text-[20px] font-bold flex items-center">
                김헬창님
                <button type="button">
                  <Image src={infoEditButton} alt="infoEditButton" />
                </button>
              </div>

              <button className=" bg-[#22C55E] rounded-[12px] w-[40px] h-[40px] flex justify-center items-center">
                <Image src={logout} alt="logout" />
              </button>
            </div>
            <div className="text-[17px] text-slate-400">gymgym12@naver.com</div>
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
