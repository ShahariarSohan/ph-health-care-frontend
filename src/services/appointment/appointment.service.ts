/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/serverFetch";

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