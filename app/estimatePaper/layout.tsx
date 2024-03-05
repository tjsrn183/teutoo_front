import { ReactNode } from "react";

interface RoleProps {
  trainer: ReactNode;
  user: ReactNode;
}
export default function estimatePaperLayout({ trainer, user }: RoleProps) {
  let role = "trainer";
  return <div className=" h-screen">{role === "trainer" ? trainer : user}</div>;
}
