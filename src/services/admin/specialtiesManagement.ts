/* eslint-disable @typescript-eslint/no-explicit-any */

"use server"


import { serverFetch } from "@/lib/serverFetch";
import zodValidator from "@/lib/zodValidator";
import { createSpecialtyZodSchema } from "@/zod/specialty.validation";




export const createSpecialties = async (_preState: any, formData: FormData) => {
  
    try {
        const payload = {
            title: formData.get("title") as string
        }
        ///zod validator
        if (zodValidator(payload, createSpecialtyZodSchema).success === false) {
            return zodValidator(payload, createSpecialtyZodSchema);
        }
          const validatedPayload = zodValidator(
            payload,
            createSpecialtyZodSchema
      ).data
      if (!validatedPayload) {
        throw new Error("Invalid payload");
      }
        const newFormData = new FormData();
        newFormData.append("data", JSON.stringify(validatedPayload))
        if (formData.get("file")) {
          newFormData.append("file",formData.get("file") as Blob)
        }
        const res = await serverFetch.post("/specialties", {
            body:newFormData
        })
      const result = await res.json()
        return result;
    }
    catch (err: any) {
        console.log(err)
        return { success: false, message: `${process.env.NODE_ENV === "development" ? err.message : "Something went wrong"}` };
    }
} 
export const getSpecialties = async () => { 
    try {
        const res = await serverFetch.get("/specialties");
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
export const deleteSpecialties = async (id: string) => { 
        try {
          const res = await serverFetch.delete(`/specialties/${id}`);
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


