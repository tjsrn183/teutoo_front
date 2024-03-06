import schedule from "@/public/trainerMyPageIcons/schedule.png";
import programManage from "@/public/trainerMyPageIcons/programManage.png";
import trainerInfo from "@/public/trainerMyPageIcons/trainerInfo.png";
import MyInfoChunk from "./components/MyInfoChunk";
import MyPageButton from "./components/MyPageButton";
import { sendRequest } from "@/app/api/rootApi";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export const fetchUserData = async () => {
  return await sendRequest("members/me", "get");
};

export default function TrainerMyPage() {
  const queryClient = new QueryClient();
  queryClient.prefetchQuery({ queryKey: ["userData"], queryFn: fetchUserData });
  const dehydratedState = dehydrate(queryClient);
  console.log("data야~~~", dehydratedState);
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className=" bg-white px-2">
        <div className="  text-black px-2">
          <MyInfoChunk />
          <div className=" flex my-3">
            <MyPageButton
              src={schedule}
              alt="schedule"
              content="PT 일정"
              move="/schedule"
            />
            <MyPageButton
              src={programManage}
              alt="programManage"
              content="프로그램 관리"
              move="/programManage"
            />
            <MyPageButton
              src={trainerInfo}
              alt="trainerInfo"
              content="트레이너 정보"
              move="/introduceTrainer"
            />
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
}
