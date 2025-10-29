import { PublicNav } from "@/components/shared/PublicNav";
import React from "react";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicNav></PublicNav>
      <div>{children}</div>
    </>
  );
}
