/* eslint-disable @typescript-eslint/no-explicit-any */

"use server"

import z from "zod";
import loginUser from "./loginUser";

const registerValidationSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must not be more than 100 characters"),
    email: z.email("Invalid email address"),
    address: z.string().optional(),
    password: z.string().min(8, "Password must be at least 8 characters").max(100, "Password must not be more than 100 characters"),
    confirmPassword: z.string().min(8, "Confirm Password must be at least 8 characters").max(100, "Confirm Password must not be more than 100 characters"),
}).refine((data) => data.password === data.confirmPassword, {
    error: "Password do not match",
    path:["confirmPassword"]
})
const registerPatient = async (_currentState: any, formData: any) => {
    
    try { 

        const validatedRegisterData = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            address: formData.get("address") as string,
            password: formData.get("password") as string,
            confirmPassword: formData.get("confirmPassword") as string,
        }
        const validatedFields = registerValidationSchema.safeParse(validatedRegisterData)

        if (!validatedFields.success) { 
            return {
                success: false,
                errors:validatedFields.error.issues.map((issue) => {
                    return {
                        field: issue.path[0],
                        message: issue.message
                    }
                })
            }
        }
        const registerData = {
            password: formData.get("password"),
            patient: {
                name:formData.get("name"),
                email:formData.get("email"),
                address:formData.get("address")
            }
        }
        const newFormData = new FormData()
        newFormData.append("data", JSON.stringify(registerData))
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/create-patient`, {
            method: "POST",
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