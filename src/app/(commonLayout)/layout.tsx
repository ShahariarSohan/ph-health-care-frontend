import { PublicNav } from "@/components/shared/PublicNav";
import React from "react";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <PublicNav></PublicNav>
      {children}
    </div>
  );
}
