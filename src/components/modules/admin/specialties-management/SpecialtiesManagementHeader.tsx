"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";

import SpecialtiesManagementDialog from "./SpecialtiesManagementDialog";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function SpecialtiesManagementHeader() {
    const router = useRouter();
    const [,startTransition]=useTransition()
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleSuccess = () => {
        startTransition(() => {
            router.refresh()
        })
    }
  return (
    <>
      <SpecialtiesManagementDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleSuccess}
      />

      <ManagementPageHeader
        title="Specialties Management"
        description="Manage Specialties information and details"
        action={{
          label: "Add Specialty",
          icon: Plus,
          onClick: () => setIsDialogOpen(true),
        }}
      />
    </>
  );
}
