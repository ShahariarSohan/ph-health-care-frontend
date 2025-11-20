"use client";


import DateCell from "@/components/shared/cell/DateCell";
import StatusBadgeCell from "@/components/shared/cell/StatusBadgeCell";
import UserInfoCell from "@/components/shared/cell/UserInfoCell";
import {  IColumn } from "@/components/shared/ManagementTable";
import { IPatient } from "@/types/patient.interface";



export const patientsColumns: IColumn<IPatient>[] = [
  {
    header: "Patient",
    accessor: (patient) => (
      <UserInfoCell
        name={patient.name}
        email={patient.email}
        photo={patient.profilePhoto}
      />
    ),
  },
 
  {
    header: "Contact",
    accessor: (patient) => (
      <div className="flex flex-col">
        <span className="text-sm">{patient.contactNumber}</span>
      </div>
    ),
  },
 
  {
    header: "Status",
    accessor: (patient) => <StatusBadgeCell isDeleted={patient.isDeleted} />,
  },
  {
    header: "Joined",
    accessor: (patient) => <DateCell date={patient.createdAt} />,
  },
];
