import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { sendRequest } from "@/app/api/rootApi";
import { redirect } from "next/navigation";

export const fetchUserData = async () => {
  return await sendRequest("members/me", "get");
};

export default async function AfterLoginLayout({
  children,
}: {
  children: React.ReactNode;
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
      <div>{children}</div>
    </HydrationBoundary>
  );
}
