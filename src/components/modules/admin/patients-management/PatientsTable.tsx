"use client"
import ManagementTable from "@/components/shared/ManagementTable";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";


import { toast } from "sonner";
import { IPatient } from "@/types/patient.interface";
import { patientsColumns } from "./PatientsColumn";
import { deletePatient } from "@/services/admin/patientManagement";
import PatientsManagementDialog from "./PatientsManagementDialog";
import PatientViewDetailDialog from "./PatientsViewDetailDialog";


interface IPatientsTableProps {
  patients: IPatient[];
 
}
export default function PatientsTable({ patients }: IPatientsTableProps) {
  const router = useRouter()
  const [, startTransition] = useTransition()
  const [deletingPatient, setDeletingPatient] = useState<IPatient|null>(null)
  const [viewPatient, setViewPatient] = useState<IPatient | null>(null)
  const [editPatient, setEditPatient] = useState<IPatient | null>(null);
  const [isDeleting,setIsDeleting]=useState(false)
  const handleRefresh = () => {
    startTransition(() => {
      router.refresh()
    })
  }
  const handleView = (patient:IPatient) => {
    setViewPatient(patient)
  }
  const handleEdit = (patient:IPatient) => {
    setEditPatient(patient)
  }
  const handleDelete = (patient:IPatient) => {
    setDeletingPatient(patient)
  }
  const confirmDelete =async () => {
    if (!deletingPatient) return;
    setIsDeleting(true)
    const result = await deletePatient(deletingPatient.id!)
    setIsDeleting(false)
    if (result.success) {
      
      toast.success(result.message || "Patient deleted successfully")
      setDeletingPatient(null)
      handleRefresh();
    }
    else {
      toast.error(result.message || "Patient deletion failed");
    }
  }
  return (
    <>
      <ManagementTable
        data={patients}
        columns={patientsColumns}
        onDelete={handleDelete}
        onView={handleView}
        onEdit={handleEdit}
        getRowKey={(patient) => patient.id!}
        emptyMessage="No patients found"
      />
      <PatientsManagementDialog
        open={!!editPatient}
        onClose={() => setEditPatient(null)}
        patient={editPatient!}
        onSuccess={() => {
          setEditPatient(null);
          handleRefresh();
        }}
      />
      <PatientViewDetailDialog
        open={!!viewPatient}
        onClose={() => setViewPatient(null)}
        patient={viewPatient}
      ></PatientViewDetailDialog>
      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingPatient}
        onOpenChange={(open) => !open && setDeletingPatient(null)}
        onConfirm={confirmDelete}
        title="Delete patient"
        description={`Are you sure you want to delete ${deletingPatient?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
}