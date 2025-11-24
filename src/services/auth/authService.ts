/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import zodValidator from "@/lib/zodValidator";
import { resetPasswordSchema } from "@/zod/auth.validation";
import { getCookie } from "./tokenHandlers";
import  jwt, { JwtPayload }  from "jsonwebtoken";
import getUserInfo from "./getUserInfo";
import { UserRole } from "@/types/userRole";
import { serverFetch } from "@/lib/serverFetch";
import { revalidateTag } from "next/cache";
import { getDefaultDashboardRoute, validRedirectForRole } from "@/lib/auth.util";
import { redirect } from "next/navigation";

export const resetPassword =async (_prevState:any,formData:FormData) => {
    const redirectTo = formData.get("redirect") || null;
    const validationPayload = {
        newPassword: formData.get("newPassword") as string,
        confirmPassword:formData.get("confirmPassword") as  string,
    }
    const validatedPayload = zodValidator(validationPayload, resetPasswordSchema)
     if (!validatedPayload.success && validatedPayload.errors) {
       return {
         success: false,
         message: "Validation failed",
         formData: validationPayload,
         errors: validatedPayload.errors,
       };
    }
    try { 
        const accessToken = await getCookie("accessToken")
        if (!accessToken) {
            throw new Error("User is not authenticated")
        }
        const verifiedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload
        const userRole: UserRole = verifiedToken.role
        const user = await getUserInfo()
        const res = await serverFetch.post("/auth/reset-password", {
          body: JSON.stringify({
            id: user?.id,
            password: validationPayload.newPassword,
          }),
          headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
          },
        });
        const result = await res.json()
        if (!result.success) {
            throw new Error(result.message||"reset password failed")
        }
        if (result.success) {
            revalidateTag("USERINFO",{expire:0})
        }
       
        if (redirectTo) {
            const requestedPath = redirectTo.toString()
            if (validRedirectForRole(requestedPath, userRole)) {
                redirect(`${requestedPath}?loggedIn=true`)
            } else {
                redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`)
            }
        } else {
            redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`)
        }
    } catch (error:any) {
        console.log(error)
        if (error?.digest?.startsWith("NEXT_REDIRECT")) {
          throw error;
        }
        return {
          success: false,
          message: error?.message || "Something went wrong",
          formData: validationPayload,
        };
    }
};

