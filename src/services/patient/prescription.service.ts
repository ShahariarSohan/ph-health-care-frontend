"use server";
import { serverFetch } from "@/lib/serverFetch";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { IPrescriptionFormData } from "@/types/prescription.interface";

export const createPrescription=async(data: IPrescriptionFormData)=> {
  try {
    const response = await serverFetch.post("/prescription", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Error creating prescription:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to create prescription",
    };
  }
}

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
