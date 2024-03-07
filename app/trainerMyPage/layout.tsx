import { ReactNode } from "react";
import BottomNavigationBar from "../../components/BottomNavigationBar";
import { SmallHeader } from "@/components/SmallHeader";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { sendRequest } from "@/app/api/rootApi";
import { redirect } from "next/navigation";
const fetchUserData = async () => {
  return await sendRequest("members/me", "get");
};
export default async function trainerMyPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["userData"],
    queryFn: fetchUserData,
  });
  const dehydratedState = dehydrate(queryClient);

  const userData = queryClient.getQueryData(["userData"]);

  if (!userData) {
    redirect("/login");
  }

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className=" md:max-w-md h-screen">
        <SmallHeader title="마이페이지" arrrowHidden />

        <div>{children}</div>

        <BottomNavigationBar />
      </div>
    </HydrationBoundary>
  );
}
