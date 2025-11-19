/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/serverFetch";
import zodValidator from "@/lib/zodValidator";
import { IAdmin } from "@/types/admin.interface";
import { createAdminZodSchema, updateAdminZodSchema } from "@/zod/admin.validation";

export const createAdmin = async (_prevState: any, formData: FormData) => {
    
  try {
    const payload: IAdmin = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      contactNumber: formData.get("contactNumber") as string,
      };
      
    if (zodValidator(payload, createAdminZodSchema).success === false) {
      return zodValidator(payload, createAdminZodSchema);
    }
      const validatedPayload = zodValidator(payload, createAdminZodSchema).data;
    if (!validatedPayload) {
      throw new Error("Invalid Payload");
    }
    
    const newPayload = {
      password: validatedPayload.password,
      admin: {
        name: validatedPayload.name,
        email: validatedPayload.email,
        contactNumber: validatedPayload.contactNumber,
      },
      };
      console.log(newPayload)
    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(newPayload));
    if (formData.get("file")) {
      newFormData.append("file", formData.get("file") as Blob);
    }
    const res = await serverFetch.post("/user/create-admin", {
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
export const getAdmins = async (queryString?: string) => {
  try {
    const res = await serverFetch.get(
      `/admin${queryString ? `?${queryString}` : ""} `
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
export async function getAdminById(id: string) {
  try {
    const response = await serverFetch.get(`/admin/${id}`);
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
export const updateAdmin = async (
  id: string,
  _prevState: any,
  formData: FormData
) => {
  try {
    const payload: Partial<IAdmin> = {
      name: formData.get("name") as string,
      contactNumber: formData.get("contactNumber") as string,
      };
      
    if (zodValidator(payload, updateAdminZodSchema).success === false) {
      return zodValidator(payload, updateAdminZodSchema);
    }
      const validatedPayload = zodValidator(payload, updateAdminZodSchema).data;
      console.log("validatedPayload",validatedPayload)
    if (!validatedPayload) {
      throw new Error("Invalid payload");
    }
    const res = await serverFetch.patch(`/admin/${id}`, {
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
export const softDeleteAdmin = async (id: string) => {
  try {
    const res = await serverFetch.delete(`/admin/soft/${id}`);
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
export const deleteAdmin = async (id: string) => {
  try {
    const res = await serverFetch.delete(`/admin/${id}`);
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