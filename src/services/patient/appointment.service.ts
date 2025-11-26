
"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/serverFetch";
import { IAppointmentFormData } from "@/types/appointment.interface";

export const createAppointment = async (appointmentData:IAppointmentFormData) => {
    try { 

        const res = await serverFetch.post(`/appointment`, {
            body: JSON.stringify(appointmentData),
            headers:{
                "Content-Type":"application/json"
            }
        })
        const result = await res.json();
        return result

    } catch (err: any) {
        console.log(err)
        return {
          success: false,
          message:
            process.env.NODE_ENV === "development"
              ? err.message
              : "Failed to book appointment",
        };
    }
}


export const getMyAppointments = async (queryString?: string) => {
    try {
      const res = await serverFetch.get(`/appointment/my-appointment${queryString?`?${queryString}`:"?sortBy=createdAt&sortOrder=desc"}`
      );
      const result = await res.json();
      return result;
    } catch (err: any) {
      console.log(err);
      return {
        success: false,
        message:
          process.env.NODE_ENV === "development"
            ? err.message
            : "Failed to book appointment",
      };
    }
}


export const  getAppointmentById=async(appointmentId: string)=> {
  try {
    const response = await serverFetch.get("/appointment/my-appointment");
    const result = await response.json();

    if (result.success && result.data) {
      // Find the appointment by ID from the list
      const appointment = result.data.find(
        (apt: any) => apt.id === appointmentId
      );

      if (appointment) {
        return {
          success: true,
          data: appointment,
        };
      } else {
        return {
          success: false,
          data: null,
          message: "Appointment not found",
        };
      }
    }

    return {
      success: false,
      data: null,
      message: result.message || "Failed to fetch appointment",
    };
  } catch (error: any) {
    console.error("Error fetching appointment:", error);
    return {
      success: false,
      data: null,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch appointment",
    };
  }
}

export const changeAppointmentStatus=async(
  appointmentId: string,
  status: string
)=>{
  try {
    const response = await serverFetch.patch(
      `/appointment/status/${appointmentId}`,
      {
        body: JSON.stringify({ status }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Error changing appointment status:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to change appointment status",
    };
  }
}