"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import DoctorsManagementDialog from "./DoctorsManagementDialog";
import { ISpecialty } from "@/types/specialty.interface";
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
  const [dialogKey, setDialogKey] = useState(0)
  const handleCloseDialog=()=>{
    setIsDialogOpen(false)
  }
  const handleOpenDialog = () => {
    setDialogKey(prev => prev + 1)
    setIsDialogOpen(true)
  }
  return (
    <>
      <DoctorsManagementDialog
        key={dialogKey}
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccess={handleSuccess}
        specialties={specialties}
      />

      <ManagementPageHeader
        title="Doctors Management"
        description="Manage Doctors information and details"
        action={{
          label: "Add Doctor",
          icon: Plus,
          onClick: handleOpenDialog,
        }}
      />
    </>
  );
}
