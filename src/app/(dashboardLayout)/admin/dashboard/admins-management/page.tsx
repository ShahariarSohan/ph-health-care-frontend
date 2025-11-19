import AdminsManagementHeader from "@/components/modules/admin/admins-management/AdminsManagementHeader";
import AdminsTable from "@/components/modules/admin/admins-management/AdminsTable";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAdmins } from "@/services/admin/adminManagement";
import { Suspense } from "react";

export default async function AdminManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const admins = await getAdmins(queryStringFormatter(searchParamsObj));
  const totalPages = Math.ceil(admins?.meta?.total / admins.meta?.limit);
  const currentPage=admins?.meta?.page
  return (
    <div className="space-y-5">
          <AdminsManagementHeader></AdminsManagementHeader>
          <div className="flex items-center gap-2">
            <SearchFilter
              paramName="searchTerm"
              placeholder="Search admins..."
            ></SearchFilter>
            {/* <SelectFilter
              paramName="Specialty"
              options={specialtiesResult?.data?.map((specialty: ISpecialty) => ({
                label: specialty.title,
                value: specialty.id,
              }))}
              placeholder="Filter by Specialty"
            ></SelectFilter> */}
            <RefreshButton></RefreshButton>
          </div>
          <Suspense fallback={<TableSkeleton columns={10} rows={5} />}>
            <AdminsTable
              admins={admins?.data}
              
            ></AdminsTable>
          </Suspense>
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
          ></TablePagination>
        </div>
  );
}
