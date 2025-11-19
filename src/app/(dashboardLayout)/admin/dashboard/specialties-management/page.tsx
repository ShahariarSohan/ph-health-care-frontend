import SpecialtiesManagementHeader from "@/components/modules/admin/specialties-management/SpecialtiesManagementHeader";
import SpecialtiesTable from "@/components/modules/admin/specialties-management/SpecialtiesTable";
import RefreshButton from "@/components/shared/RefreshButton";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { getSpecialties } from "@/services/admin/specialtiesManagement";

import { Suspense } from "react";

export default async function SpecialtyManagementPage() {
  const result = await getSpecialties()
  return (
    <div className="space-y-5">
      <SpecialtiesManagementHeader></SpecialtiesManagementHeader>
      <div>
        <RefreshButton></RefreshButton>
      </div>
      <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
      <SpecialtiesTable specialties={result.data}></SpecialtiesTable>
      </Suspense>
    </div>
  );
}
