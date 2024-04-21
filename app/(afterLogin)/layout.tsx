import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getUserData } from "./myPage/api/getUserData";
import { redirect } from "next/navigation";

export default async function AfterLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["userData"],
    queryFn: getUserData,
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
