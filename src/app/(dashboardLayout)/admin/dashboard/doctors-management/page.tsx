import DoctorFilters from "@/components/modules/admin/doctors-management/DoctorFilters";
import DoctorsManagementHeader from "@/components/modules/admin/doctors-management/DoctorsManagementHeader";
import DoctorsTable from "@/components/modules/admin/doctors-management/DoctorsTable";

import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getDoctors } from "@/services/admin/doctorManagement";

import { getSpecialties } from "@/services/admin/specialtyManagement";

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
    (doctors?.meta?.total || 1) / (doctors?.meta?.limit || 1)
  );
  const currentPage = doctors?.meta?.page||1
  return (
    <div className="space-y-5">
      <DoctorsManagementHeader
        specialties={specialtiesResult?.data}
      ></DoctorsManagementHeader>
      <DoctorFilters specialties={specialtiesResult?.data}></DoctorFilters>
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
