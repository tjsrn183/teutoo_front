import { ReactNode } from "react";

export default function JoinLayout({
  children,
  location,
}: {
  children: ReactNode;
  location: ReactNode;
}) {
  return (
    <div>
      {location}
      {children}
    </div>
  );
}
