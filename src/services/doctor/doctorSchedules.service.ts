"use server"
import { serverFetch } from "@/lib/serverFetch";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getDoctorOwnSchedules = async (queryString?: string) => {
    try {
        const res = await serverFetch.get(`/doctor-schedule${queryString ? `?${queryString}` : ""}`)
        const result = await res.json()
        return {
            success: result.success,
            data: Array.isArray(result?.data) ? result.data : [],
            meta:result.meta
        }

    } catch (error: any) {
      console.log(error);
      return {
        success: false,
        data: [],
        message: `${
          process.env.NODE_ENV === "development"
            ? error.message
            : "Something went wrong"
        }`,
      };
    }
}
export const getAvailableSchedules = async () => {
    try {
        const res = await serverFetch.get(`/schedule`)
        const result = await res.json()
        return result
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

export const createDoctorSchedule = async (scheduleIds: string[]) => {
    try {
        const res = await serverFetch.post(`/doctor-schedule`, {
            body: JSON.stringify({ scheduleIds }),
            headers: {"Content-Type":"application/json"}
        })
        const result = await res.json()
        return result;
}
     catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

export async function deleteDoctorOwnSchedule(scheduleId: string) {
  try {
    const response = await serverFetch.delete(`/doctor-schedule/${scheduleId}`);
    const result = await response.json();

    return {
      success: result.success,
      message: result.message || "Schedule removed successfully",
    };
  } catch (error: any) {
    console.error("Delete schedule error:", error);
    return {
      success: false,
      message: error.message || "Failed to remove schedule",
    };
  }
}