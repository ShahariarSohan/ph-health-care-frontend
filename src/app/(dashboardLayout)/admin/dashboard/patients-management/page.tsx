
import PatientsManagementHeader from "@/components/modules/admin/patients-management/PatientsManagementHeader";
import PatientsTable from "@/components/modules/admin/patients-management/PatientsTable";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getPatients } from "@/services/admin/patientManagement";

import { Suspense } from "react";

export default async function PatientManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const patients = await getPatients(queryStringFormatter(searchParamsObj));
 
  const totalPages = Math.ceil(patients?.meta?.total / patients?.meta?.limit);
  const currentPage = patients?.meta?.page
  
  return (
    <div className="space-y-5">
          <PatientsManagementHeader></PatientsManagementHeader>
          <div className="flex items-center gap-2">
            <SearchFilter
              paramName="searchTerm"
              placeholder="Search patients..."
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
            <PatientsTable
              patients={patients?.data}
            ></PatientsTable>
          </Suspense>
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
          ></TablePagination>
        </div>
  );
}
