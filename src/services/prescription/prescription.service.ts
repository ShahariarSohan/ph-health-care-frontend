"use server";
import { serverFetch } from "@/lib/serverFetch";
/* eslint-disable @typescript-eslint/no-explicit-any */



export const getMyPrescriptions=async(queryString?: string)=> {
  try {
    const response = await serverFetch.get(
      `/prescription/my-prescription${queryString ? `?${queryString}` : ""}`
    );
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Error fetching prescriptions:", error);
    return {
      success: false,
      data: [],
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch prescriptions",
    };
  }
}

export const getAllPrescriptions=async(queryString?: string) =>{
  try {
    const response = await serverFetch.get(
      `/prescription${queryString ? `?${queryString}` : ""}`
    );
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Error fetching prescriptions:", error);
    return {
      success: false,
      data: [],
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch prescriptions",
    };
  }
}
