"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import DoctorsManagementDialog from "./DoctorsManagementDialog";
import { ISpecialty } from "@/types/specialties.interface";
interface IDoctorManagementHeaderProps {
  specialties: ISpecialty[];
  
}
export default function DoctorsManagementHeader({
  specialties,
  
}: IDoctorManagementHeaderProps) {
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
      <DoctorsManagementDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleSuccess}
        specialties={specialties}
      />

      <ManagementPageHeader
        title="Doctors Management"
        description="Manage Doctors information and details"
        action={{
          label: "Add Doctor",
          icon: Plus,
          onClick: () => setIsDialogOpen(true),
        }}
      />
    </>
  );
}
