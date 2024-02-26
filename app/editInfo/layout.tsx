import Header from "@/components/Header";
import { ReactNode } from "react";

export default function editInfoLayout({
  children,
  editLocation,
}: {
  children: ReactNode;
  editLocation: ReactNode;
}) {
  return (
    <>
      <Header />
      <div>
        {editLocation}
        {children}
      </div>
    </>
  );
}
