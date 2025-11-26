import AppointmentConfirmation from "@/components/modules/patient/AppointmentConfirmation";
import { getDoctorById } from "@/services/admin/doctorManagement";
import { getScheduleById } from "@/services/admin/scheduleManagement";
import { IDoctor } from "@/types/doctor.interface";
import { ISchedule } from "@/types/schedule.interface";
import { notFound } from "next/navigation";
interface IBookAppointmentPageProps {
  params: Promise<{
    doctorId: string;
    scheduleId: string;
  }>;
}
export default async function AppointmentBookingPage({ params }: IBookAppointmentPageProps) {
  const { doctorId, scheduleId } = await params;

  const [doctorResponse, scheduleResponse] = await Promise.all([
    getDoctorById(doctorId),
    getScheduleById(scheduleId)
  ])
  if (!doctorResponse?.success || !scheduleResponse?.success) {
    notFound()
  }
  const doctor:IDoctor = doctorResponse?.data;
  const schedule:ISchedule = scheduleResponse?.data;
  return (
    <div>
      <AppointmentConfirmation doctor={doctor} schedule={schedule}></AppointmentConfirmation>
    </div>
  );
}