/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/serverFetch";

export const changeAppointmentStatus = async (
  appointmentId: string,
  status: string
) => {
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
};
