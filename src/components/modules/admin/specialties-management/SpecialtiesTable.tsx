"use client"
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { ISpecialty } from "@/types/specialties.interface";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteSpecialties } from "@/services/admin/specialtiesManagement";
import { toast } from "sonner";
import { specialtiesColumns } from "./SpecialtiesColumn";

interface ISpecialtyTableProps {
  specialties: ISpecialty[];
}
export default function SpecialtiesTable({ specialties }: ISpecialtyTableProps) {
    const router = useRouter();
    const [, startTransition] = useTransition()
    const [isDeletingDialog, setIsDeletingDialog] = useState(false)
    const [deletingSpecialty, setDeletingSpecialty] = useState<ISpecialty | null>(null)
    
    const handleRefresh = () => {
        startTransition(() => {
            router.refresh()
        })
    }
    const handleDelete = (specialty: ISpecialty) => {
      setDeletingSpecialty(specialty);
    };
    const confirmDelete = async() => {
        if (!deletingSpecialty) return
        setIsDeletingDialog(true)
        const result = await deleteSpecialties(deletingSpecialty.id)
        setIsDeletingDialog(false);
        if (result.success) {
            toast.success(result.message || "Specialty deleted successfully")
            setDeletingSpecialty(null)
            handleRefresh()
        } else {
            toast.error(result.message ||"Specialty deletion failed")
        }
    }
  return (
    <>
      <ManagementTable
        data={specialties}
        columns={specialtiesColumns}
        onDelete={handleDelete}
        getRowKey={(specialty) => specialty.id}
        emptyMessage="No specialties found"
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingSpecialty}
        onOpenChange={(open) => !open && setDeletingSpecialty(null)}
        onConfirm={confirmDelete}
        title="Delete Specialty"
        description={`Are you sure you want to delete ${deletingSpecialty?.title}? This action cannot be undone.`}
        isDeleting={isDeletingDialog}
      />
    </>
  );
}
