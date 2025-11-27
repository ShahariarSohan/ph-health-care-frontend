/* eslint-disable @typescript-eslint/no-explicit-any */
import { IColumn } from "@/components/shared/ManagementTable";
import { Badge } from "@/components/ui/badge";
import getStatusBadge from "@/lib/getStatusBadge";
import {
  AppointmentStatus,
  IAppointment,
} from "@/types/appointment.interface";
import { format } from "date-fns";



export const doctorAppointmentColumns: IColumn<IAppointment>[] = [
  {
    header: "Patient",
    accessor: (appointment) => (
      <div className="flex items-center gap-2">
        <div>
          <p className="font-medium">{appointment.patient?.name || "N/A"}</p>
          <p className="text-xs text-muted-foreground">
            {appointment.patient?.email || ""}
          </p>
        </div>
      </div>
    ),
  },
  {
    header: "Date & Time",
    accessor: (appointment) => {
      if (!appointment.schedule?.startDateTime) return "N/A";
      return (
        <div className="text-sm">
          <p className="font-medium">
            {format(
              new Date(appointment.schedule.startDateTime),
              "MMM d, yyyy"
            )}
          </p>
          <p className="text-muted-foreground">
            {format(new Date(appointment.schedule.startDateTime), "h:mm a")} -{" "}
            {format(new Date(appointment.schedule.endDateTime), "h:mm a")}
          </p>
        </div>
      );
    },
    sortKey: "schedule.startDateTime",
  },
  {
    header: "Status",
    accessor: (appointment) => getStatusBadge(appointment.status)
    
  },
  {
    header: "Payment",
    accessor: (appointment) => {
      const isPaid = appointment.paymentStatus === "PAID";
      return (
        <Badge
          variant={isPaid ? "default" : "secondary"}
          className={isPaid ? "bg-green-500" : ""}
        >
          {isPaid ? "Paid" : "Unpaid"}
        </Badge>
      );
    },
  },
  {
    header: "Prescription",
    accessor: (appointment) => {
      return appointment.prescription ? (
        <Badge variant="outline" className="bg-green-50 text-green-700">
          Provided
        </Badge>
      ) : appointment.status === AppointmentStatus.COMPLETED ? (
        <Badge variant="outline" className="bg-amber-50 text-amber-700">
          Pending
        </Badge>
      ) : (
        <span className="text-muted-foreground">-</span>
      );
    },
  },
];
