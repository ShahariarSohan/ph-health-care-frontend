import DoctorsManagementHeader from "@/components/modules/admin/doctors-management/DoctorsManagementHeader";
import DoctorsTable from "@/components/modules/admin/doctors-management/DoctorsTable";

import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getDoctors } from "@/services/admin/doctorManagement";

import { getSpecialties } from "@/services/admin/specialtyManagement";
import { ISpecialty } from "@/types/specialty.interface";
import { Suspense } from "react";

export default async function DoctorsManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const specialtiesResult = await getSpecialties();
  const doctors = await getDoctors(queryStringFormatter(searchParamsObj));
  const totalPages = Math.ceil(
    doctors?.meta?.total / doctors?.meta?.limit
  );
  const currentPage = doctors?.meta?.page;
  return (
    <div className="space-y-5">
      <DoctorsManagementHeader
        specialties={specialtiesResult.data}
      ></DoctorsManagementHeader>
      <div className="flex items-center gap-2">
        <SearchFilter
          paramName="searchTerm"
          placeholder="Search doctors..."
        ></SearchFilter>
        <SelectFilter
          paramName="Specialty"
          options={specialtiesResult?.data?.map((specialty: ISpecialty) => ({
            label: specialty.title,
            value: specialty.id,
          }))}
          placeholder="Filter by Specialty"
        ></SelectFilter>
        <RefreshButton></RefreshButton>
      </div>
      <Suspense fallback={<TableSkeleton columns={10} rows={5} />}>
        <DoctorsTable
          doctors={doctors?.data}
          specialties={specialtiesResult?.data}
        ></DoctorsTable>
      </Suspense>
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
      ></TablePagination>
    </div>
  );
}
