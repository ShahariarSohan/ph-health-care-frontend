/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/serverFetch";
import zodValidator from "@/lib/zodValidator";
import { IDoctor } from "@/types/doctor.interface";
import {
  createDoctorZodSchema,
  updateDoctorZodSchema,
} from "@/zod/doctor.validation";


export const createDoctor = async (_prevState: any, formData: FormData) => {
  try {
    const specialtiesString = formData.get("specialties") as string;
    let specialties: string[] = [];
    if (specialtiesString) {
      try {
        specialties = JSON.parse(specialtiesString);
        if (!Array.isArray(specialties)) specialties = [];
      } catch {
        specialties = [];
      }
    }

    const validationPayload: IDoctor = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      contactNumber: formData.get("contactNumber") as string,
      address: formData.get("address") as string,
      registrationNumber: formData.get("registrationNumber") as string,
      experience: Number(formData.get("experience") as string),
      gender: formData.get("gender") as "MALE" | "FEMALE",
      appointmentFee: Number(formData.get("appointmentFee") as string),
      qualification: formData.get("qualification") as string,
      currentWorkingPlace: formData.get("currentWorkingPlace") as string,
      designation: formData.get("designation") as string,
      password: formData.get("password") as string,
      profilePhoto: formData.get("file") as File,
      specialties,
    };
    const validatedPayload = zodValidator(
      validationPayload,
      createDoctorZodSchema
    );
    if (!validatedPayload.success &&validatedPayload.errors) {
      return {
        success: validatedPayload.success,
        message: "Validation failed",
        formdata: validationPayload,
        errors: validatedPayload.errors,
      };
    }
    if (!validatedPayload.data) {
      return {
        success: false,
        message: "Validation failed",
        formdata: validationPayload,
      };
    }
    const newPayload = {
      password: validatedPayload.data.password,
      doctor: {
        name: validatedPayload.data.name,
        email: validatedPayload.data.email,
        contactNumber: validatedPayload.data.contactNumber,
        address: validatedPayload.data.address,
        registrationNumber: validatedPayload.data.registrationNumber,
        experience: validatedPayload.data.experience,
        gender: validatedPayload.data.gender,
        appointmentFee: validatedPayload.data.appointmentFee,
        qualification: validatedPayload.data.qualification,
        currentWorkingPlace: validatedPayload.data.currentWorkingPlace,
        designation: validatedPayload.data.designation,
        specialties: validatedPayload.data.specialties,
      },
    };
    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(newPayload));

    if (formData.get("file")) {
      newFormData.append("file", formData.get("file") as Blob);
    }
    const res = await serverFetch.post("/user/create-doctor", {
      body: newFormData,
    });
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
export const getDoctors = async (queryString?: string) => {
  try {
    const res = await serverFetch.get(
      `/doctor${queryString ? `?${queryString}` : ""}`
    );
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
export async function getDoctorById(id: string) {
  try {
    const response = await serverFetch.get(`/doctor/${id}`);
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
export const updateDoctor = async (
  id: string,
  _prevState: any,
  formData: FormData
) => {
  try {
    const payload: Partial<IDoctor> = {
      name: formData.get("name") as string,
      contactNumber: formData.get("contactNumber") as string,
      address: formData.get("address") as string,
      registrationNumber: formData.get("registrationNumber") as string,
      experience: Number(formData.get("experience") as string),
      gender: formData.get("gender") as "MALE" | "FEMALE",
      appointmentFee: Number(formData.get("appointmentFee") as string),
      qualification: formData.get("qualification") as string,
      currentWorkingPlace: formData.get("currentWorkingPlace") as string,
      designation: formData.get("designation") as string,
    };
    if (zodValidator(payload, updateDoctorZodSchema).success === false) {
      return zodValidator(payload, updateDoctorZodSchema);
    }
    const validatedPayload = zodValidator(payload, updateDoctorZodSchema).data;
    if (!validatedPayload) {
      throw new Error("Invalid payload");
    }
    const res = await serverFetch.patch(`/doctor/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedPayload),
    });
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
export const softDeleteDoctor = async (id: string) => {
  try {
    const res = await serverFetch.delete(`/doctor/soft/${id}`);
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
export const deleteDoctor = async (id: string) => {
  try {
    const res = await serverFetch.delete(`/doctor/${id}`);
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
