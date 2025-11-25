/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import zodValidator from "@/lib/zodValidator";
import { resetPasswordSchema } from "@/zod/auth.validation";
import { deleteCookie, getCookie, setCookie } from "./tokenHandlers";
import jwt, { JwtPayload } from "jsonwebtoken";
import getUserInfo from "./getUserInfo";
import { UserRole } from "@/types/userRole";
import { serverFetch } from "@/lib/serverFetch";
import { revalidateTag } from "next/cache";
import {
  getDefaultDashboardRoute,
  validRedirectForRole,
} from "@/lib/auth.util";
import { redirect } from "next/navigation";
import verifiedAccessToken from "@/lib/jwtHandlers";
import { parse } from "cookie";

export const resetPassword = async (_prevState: any, formData: FormData) => {
  const redirectTo = formData.get("redirect") || null;
  const validationPayload = {
    newPassword: formData.get("newPassword") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };
  const validatedPayload = zodValidator(validationPayload, resetPasswordSchema);
  if (!validatedPayload.success && validatedPayload.errors) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
      errors: validatedPayload.errors,
    };
  }
  try {
    const accessToken = await getCookie("accessToken");
    if (!accessToken) {
      throw new Error("User is not authenticated");
    }
    const verifiedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as JwtPayload;
    const userRole: UserRole = verifiedToken.role;
    const user = await getUserInfo();
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
    const result = await res.json();
    if (!result.success) {
      throw new Error(result.message || "reset password failed");
    }
    if (result.success) {
      revalidateTag("USERINFO", { expire: 0 });
    }

    if (redirectTo) {
      const requestedPath = redirectTo.toString();
      if (validRedirectForRole(requestedPath, userRole)) {
        redirect(`${requestedPath}?loggedIn=true`);
      } else {
        redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
      }
    } else {
      redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
    }
  } catch (error: any) {
    console.log(error);
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
export const getNewAccessToken = async () => {
  try {
    const accessToken = await getCookie("accessToken");
    const refreshToken = await getCookie("refreshToken");
    if (!accessToken && !refreshToken) {
      return {
        tokenRefreshed: false,
      };
    }
    if (accessToken) {
      const verifiedToken = await verifiedAccessToken(accessToken);
      if (verifiedToken.success) {
        return {
          tokenRefreshed: false,
        };
      }
    }
    if (!refreshToken) {
      return {
        tokenRefreshed: false,
      };
    }
    let accessTokenObject: null | any = null;
    let refreshTokenObject: null | any = null;
    const res = await serverFetch.post("/auth/refresh-token", {
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
    });
    const result = await res.json();
    console.log("access token refreshed");
    const setCookieHeaders = res.headers.getSetCookie();
    if (setCookieHeaders && setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookie: string) => {
        const parsedCookie = parse(cookie);
        if (parsedCookie["accessToken"]) {
          accessTokenObject = parsedCookie;
        }
        if (parsedCookie["refreshToken"]) {
          refreshTokenObject = parsedCookie;
        }
      });
    } else {
      throw new Error("Set cookie headers not found");
    }
    if (!accessTokenObject) {
      throw new Error("Tokens not found in cookies");
    }
    if (!refreshTokenObject) {
      throw new Error("Tokens not found in cookies");
    }
    await deleteCookie("accessToken");
    await setCookie("accessToken", accessTokenObject.accessToken, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(accessTokenObject["Max-Age"]) || 1000 * 60 * 60,
      path: accessTokenObject.Path || "/",
      sameSite: accessTokenObject["SameSite"] || "none",
    });

    await deleteCookie("refreshToken");
    await setCookie("refreshToken", refreshTokenObject.refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge:
        parseInt(refreshTokenObject["Max-Age"]) || 1000 * 60 * 60 * 24 * 90,
      path: refreshTokenObject.Path || "/",
      sameSite: refreshTokenObject["SameSite"] || "none",
    });
    if (!result.success) {
      throw new Error(result.message || "Token refresh failed");
    }

    return {
      tokenRefreshed: true,
      success: true,
      message: "Token refreshed successfully",
    };
  } catch (err: any) {
    return {
      tokenRefreshed: false,
      success: false,
      message: err.message || "Something went wrong",
    };
  }
};
