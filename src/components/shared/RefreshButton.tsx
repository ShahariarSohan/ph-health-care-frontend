"use client";

import { RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface IRefreshButtonProps {
  size?: "sm" | "default" | "lg";
  variant?: "default" | "outline" | "ghost";
  showLabel?: boolean;
}

export default function RefreshButton({
  size,
  variant,
  showLabel=true,
}: IRefreshButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleRefresh = () => {
    startTransition(() => {
      router.push(window.location.pathname);
    });
  };
  return (
    <Button
      size={size}
      variant={variant}
      onClick={handleRefresh}
      disabled={isPending}
    >
      <RefreshCcw
        className={`h-4 w-4 ${isPending ? "animate-spin" : ""} ${
          showLabel ? "mr-2" : ""
        }`}
      />
      {showLabel && "Refresh"}
    </Button>
  );
}
