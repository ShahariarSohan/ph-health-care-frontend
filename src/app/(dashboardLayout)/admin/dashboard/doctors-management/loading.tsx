import ManagementPageLoading from "@/components/shared/ManagementPageLoader";

export default function DoctorLoader() {
  return (
    <>
      <ManagementPageLoading
        columns={10}
        hasActionButton
        filterCount={5}
        filterWidths={["w-48", "w-32", "w-40", "w-24", "w-36"]}
      />
    </>
  );
}
