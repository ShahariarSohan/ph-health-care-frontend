/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { AppointmentStatus } from "@/types/appointment.interface";

const getStatusBadge = (status: AppointmentStatus) => {
  const statusConfig: Record<
    AppointmentStatus,
    { variant: any; label: string; className?: string }
  > = {
    [AppointmentStatus.SCHEDULED]: {
      variant: "default",
      label: "Scheduled",
      className: "bg-blue-500 hover:bg-blue-600",
    },
    [AppointmentStatus.INPROGRESS]: {
      variant: "secondary",
      label: "In Progress",
    },
    [AppointmentStatus.COMPLETED]: {
      variant: "default",
      label: "Completed",
      className: "bg-green-500 hover:bg-green-600",
    },
    [AppointmentStatus.CANCELED]: {
      variant: "destructive",
      label: "Canceled",
    },
  };

  const config = statusConfig[status];
  return (
    <Badge variant={config.variant} className={config.className}>
      {config.label}
    </Badge>
  );
};
export default getStatusBadge;