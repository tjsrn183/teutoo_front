import { sendRequest } from "@/app/api/rootApi";
import TrainerMyPageComponent from "./components/TrainerMyPageComponent";

export const fetchUserData = async () => {
  return await sendRequest("members/me", "get");
};

export default function TrainerMyPage() {
  return <TrainerMyPageComponent />;
}
