/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/serverFetch";
import zodValidator from "@/lib/zodValidator";
import { IPatient } from "@/types/patient.interface";

import { updatePatientZodSchema } from "@/zod/patient.validation";

export const getPatients = async (queryString?: string) => {
  try {
    const res = await serverFetch.get(
      `/patient${queryString ? `?${queryString}` : ""} `
    );
    const result = await res.json();
    return result;
  } catch (err: any) {
    console.log(err);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? err.message
          : "Something went wrong"
      }`,
    };
  }
};
export async function getPatientById(id: string) {
  try {
    const response = await serverFetch.get(`/patient/${id}`);
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}

export const updatePatient = async (
  _prevState: any,
  formData: FormData
) => {
  try {
    const id = formData.get("id") as string;
    if (!id) {
      return { success: false, message: "Patient ID is missing" };
    }
    const payload: Partial<IPatient> = {
      name: formData.get("name") as string,
      address: formData.get("address") as string,
      contactNumber: formData.get("contactNumber") as string,
      };
      
    if (zodValidator(payload, updatePatientZodSchema).success === false) {
      return zodValidator(payload, updatePatientZodSchema);
    }
      const validatedPayload = zodValidator(payload, updatePatientZodSchema).data;
      console.log("validatedPayload",validatedPayload)
    if (!validatedPayload) {
      throw new Error("Invalid payload");
    }
    const res = await serverFetch.patch(`/patient/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedPayload),
    });
    const result = await res.json();
    console.log(result)
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
};
export const softDeletePatient = async (id: string) => {
  try {
    const res = await serverFetch.delete(`/patient/soft/${id}`);
    const result = await res.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
};
export const deletePatient = async (id: string) => {
  try {
    const res = await serverFetch.delete(`/patient/${id}`);
    const result = await res.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
};