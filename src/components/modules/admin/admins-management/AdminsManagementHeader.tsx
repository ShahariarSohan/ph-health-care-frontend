"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";


import AdminsManagementDialog from "./AdminsManagementDialog";

export default function AdminsManagementHeader() {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };
  return (
    <>
      <AdminsManagementDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleSuccess}
      />
      <ManagementPageHeader
        title="Admins Management"
        description="Manage Admins information and details"
        action={{
          label: "Add Admin",
          icon: Plus,
          onClick: () => setIsDialogOpen(true),
        }}
      />
    </>
  );
}
