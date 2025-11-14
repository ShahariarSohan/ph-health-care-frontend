/* eslint-disable @typescript-eslint/no-explicit-any */

"use server"


import loginUser from "./loginUser";
import { serverFetch } from "@/lib/serverFetch";
import zodValidator from "@/lib/zodValidator";
import { registerPatientValidationSchema } from "@/zod/auth.validation";


const registerPatient = async (_currentState: any, formData: any) => {
    
    try { 

        const payload = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            address: formData.get("address") as string,
            password: formData.get("password") as string,
            confirmPassword: formData.get("confirmPassword") as string,
        }
        if (zodValidator(payload, registerPatientValidationSchema).success === false) {
             return zodValidator(payload, registerPatientValidationSchema);
        }
        const validatedPayload:any = zodValidator(
          payload,
          registerPatientValidationSchema
        ).data;

      
        const registerData = {
            password:validatedPayload.password ,
            patient: {
                name:validatedPayload.name,
                email:validatedPayload.email,
                address:validatedPayload.address
            }
        }
        const newFormData = new FormData()
        newFormData.append("data", JSON.stringify(registerData))
        if (formData.get("file")) {
            newFormData.append("file",formData.get("file") as Blob)
        }
        const res = await serverFetch.post(`/user/create-patient`, {
            body:newFormData
        })
        const result=await res.json()
        
        if (result.success) {
           await loginUser(_currentState,formData)
        }
        return result;
    }
    catch (err:any) {
        console.log(err)
        if (err?.digest?.startsWith("NEXT_REDIRECT")) {
          throw err;
        }
        return {
          success: false,
          message: `${
            process.env.NODE_ENV === "development"
              ? err.message
              : "Registration failed.Please try again later"
          }`,
        };
    }
};

export default registerPatient;