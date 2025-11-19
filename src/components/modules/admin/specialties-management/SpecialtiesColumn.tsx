import { IColumn } from "@/components/shared/ManagementTable";
import { ISpecialty } from "@/types/specialty.interface";
import Image from "next/image";

export const specialtiesColumns: IColumn<ISpecialty>[] = [
  {
    header: "Icon",
    accessor: (specialty) => (
      <Image
        src={specialty.icon}
        alt={specialty.title}
        width={40}
        height={40}
        className="rounded-full"
      ></Image>
    ),
  },
  {
    header: "Title",
    accessor: (specialty) => specialty.title,
  },
];
