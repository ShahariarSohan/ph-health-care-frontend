"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { doctorsColumns } from "./DoctorsColumn";
import { ISpecialty } from "@/types/specialty.interface";
import { IDoctor } from "@/types/doctor.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteDoctor } from "@/services/admin/doctorManagement";
import { toast } from "sonner";
import DoctorViewDetailDialog from "./DoctorViewDetailDialog";
import DoctorsManagementDialog from "./DoctorsManagementDialog";
interface IDoctorsTableProps {
  doctors: IDoctor[];
  specialties?: ISpecialty[];
}

export default function DoctorsTable({
  specialties,
  doctors,
}: IDoctorsTableProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingDoctor, setDeletingDoctor] = useState<IDoctor | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [viewDoctor, setViewDoctor] = useState<IDoctor | null>(null);
  const [editDoctor, setEditDoctor] = useState<IDoctor | null>(null);
  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };
  const handleView = (doctor: IDoctor) => {
    setViewDoctor(doctor);
  };

  const handleEdit = (doctor: IDoctor) => {
    setEditDoctor(doctor);
  };
  const handleDelete = (doctor: IDoctor) => {
    setDeletingDoctor(doctor);
  };
  const confirmDelete = async () => {
    if (!deletingDoctor) return;
    setIsDeleting(true);
    const result = await deleteDoctor(deletingDoctor.id!);
    setIsDeleting(false);
    if (result.success) {
      toast.success(result.message || "Doctor  deleted successfully");
      setDeletingDoctor(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Doctor  deletion failed");
    }
  };
  return (
    <>
      <ManagementTable
        data={doctors}
        columns={doctorsColumns}
        onDelete={handleDelete}
        onView={handleView}
        onEdit={handleEdit}
        getRowKey={(doctor) => doctor.id!}
        emptyMessage="No doctors found"
      />
      <DoctorsManagementDialog
        open={!!editDoctor}
        onClose={() => setEditDoctor(null)}
        doctor={editDoctor!}
        onSuccess={() => {
          setEditDoctor(null);
          handleRefresh();
        }}
        specialties={specialties}
      />
      <DoctorViewDetailDialog
        open={!!viewDoctor}
        onClose={() => setViewDoctor(null)}
        doctor={viewDoctor}
      ></DoctorViewDetailDialog>
      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingDoctor}
        onOpenChange={(open) => !open && setDeletingDoctor(null)}
        onConfirm={confirmDelete}
        title="Delete Doctor"
        description={`Are you sure you want to delete ${deletingDoctor?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
}
