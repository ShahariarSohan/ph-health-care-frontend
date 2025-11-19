"use client"
import ManagementTable from "@/components/shared/ManagementTable";
import AdminsManagementDialog from "./AdminsManagementDialog";
import AdminViewDetailDialog from "./AdminsViewDetailDialog";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { IAdmin } from "@/types/admin.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { adminsColumns } from "./AdminsColumn";
import { deleteAdmin } from "@/services/admin/adminManagement";
import { toast } from "sonner";


interface IAdminsTableProps {
  admins: IAdmin[];
 
}
export default function AdminsTable({ admins }: IAdminsTableProps) {
  const router = useRouter()
  const [, startTransition] = useTransition()
  const [deletingAdmin, setDeletingAdmin] = useState<IAdmin|null>(null)
  const [viewAdmin, setViewAdmin] = useState<IAdmin | null>(null)
  const [editAdmin, setEditAdmin] = useState<IAdmin | null>(null);
  const [isDeleting,setIsDeleting]=useState(false)
  const handleRefresh = () => {
    startTransition(() => {
      router.refresh()
    })
  }
  const handleView = (admin:IAdmin) => {
    setViewAdmin(admin)
  }
  const handleEdit = (admin:IAdmin) => {
    setEditAdmin(admin)
  }
  const handleDelete = (admin:IAdmin) => {
    setDeletingAdmin(admin)
  }
  const confirmDelete =async () => {
    if (!deletingAdmin) return;
    setIsDeleting(true)
    const result = await deleteAdmin(deletingAdmin.id!)
    setIsDeleting(false)
    if (result.success) {
      
      toast.success(result.message || "Admin deleted successfully")
      setDeletingAdmin(null)
      handleRefresh();
    }
    else {
      toast.error(result.message || "Admin deletion failed");
    }
  }
  return (
    <>
      <ManagementTable
        data={admins}
        columns={adminsColumns}
        onDelete={handleDelete}
        onView={handleView}
        onEdit={handleEdit}
        getRowKey={(admin) => admin.id!}
        emptyMessage="No admins found"
      />
      <AdminsManagementDialog
        open={!!editAdmin}
        onClose={() => setEditAdmin(null)}
        admin={editAdmin!}
        onSuccess={() => {
          setEditAdmin(null);
          handleRefresh();
        }}
      />
      <AdminViewDetailDialog
        open={!!viewAdmin}
        onClose={() => setViewAdmin(null)}
        admin={viewAdmin}
      ></AdminViewDetailDialog>
      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingAdmin}
        onOpenChange={(open) => !open && setDeletingAdmin(null)}
        onConfirm={confirmDelete}
        title="Delete admin"
        description={`Are you sure you want to delete ${deletingAdmin?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
}