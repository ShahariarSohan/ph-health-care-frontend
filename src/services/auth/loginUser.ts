/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import z from "zod";
import { parse } from "cookie";

import { redirect } from "next/navigation";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken"
import { getDefaultDashboardRoute, validRedirectForRole } from "@/lib/auth.util";
import { setCookie } from "./tokenHandlers";

const loginValidationSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(5, " Password is required and must be at least 5 characters")
    .max(100, "Password must not be more than 100 characters"),
});
const loginUser = async (_currentState: any, formData: any) => {
  try {
    const redirectTo = formData.get("redirect") || null;
    let accessTokenObject: null | any = null;
    let refreshTokenObject: null | any = null;
    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const validatedFields = loginValidationSchema.safeParse(loginData);

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.issues.map((issue) => {
          return {
            field: issue.path[0],
            message: issue.message,
          };
        }),
      };
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    const result=await res.json()
    const setCookieHeaders = res.headers.getSetCookie();
    if (setCookieHeaders && setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookie) => {
        const parsedCookie = parse(cookie);
        if (parsedCookie["accessToken"]) {
          accessTokenObject = parsedCookie;
        }
        if (parsedCookie["refreshToken"]) {
          refreshTokenObject = parsedCookie;
        }
      });
    }
    if (!accessTokenObject) {
      throw new Error("No token received");
    }
    if (!refreshTokenObject) {
      throw new Error("No token received");
    }
   
    await setCookie("accessToken", accessTokenObject.accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: parseInt(accessTokenObject["Max-Age"]) || 1000 * 60 * 60,
      path: accessTokenObject.path || "/",
      sameSite: accessTokenObject.SameSite || "none",
    });
    await setCookie("refreshToken", refreshTokenObject.refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge:
        parseInt(refreshTokenObject["Max-Age"]) || 1000 * 60 * 60 * 24 * 90,
      path: refreshTokenObject.path || "/",
      sameSite: refreshTokenObject.SameSite || "none",
    });
    
    const verifiedToken: JwtPayload|string = jwt.verify(accessTokenObject.accessToken, process.env.ACCESS_TOKEN_SECRET as string)
    if (typeof verifiedToken === "string") {
      throw new Error("You are not verified")
    }
    const userRole: any = verifiedToken.role
    
    if (!result.success) {
      throw new Error(result.message||"Login failed")
    }
    
    if (redirectTo) {
      
      const redirectPath = redirectTo.toString();
      if (validRedirectForRole(redirectPath, userRole)) {
        redirect(`${redirectPath}?loggedIn=true`)
      }
      else {
        redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`)
      }
    } else {
      redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
   }
   
  } catch (err:any) {
    console.log(err);
    if (err?.digest?.startsWith("NEXT_REDIRECT")) {
      throw err;
    }
    return { success: false, message:`${process.env.NODE_ENV==="development"?err.message:"Login failed"}` };
  }
};

export default loginUser;
