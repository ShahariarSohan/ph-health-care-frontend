"use server"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/serverFetch";
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