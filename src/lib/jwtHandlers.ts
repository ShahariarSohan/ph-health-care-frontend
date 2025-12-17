/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload } from "jsonwebtoken";

export const verifiedAccessToken = async (token: string) => {
  try {
    const verifiedPayload = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as JwtPayload;
    return {
      success: true,
      message: "Token is valid",
      payload: verifiedPayload,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || "Invalid token",
    };
  }
};
export const verifyResetPasswordToken = async (token: string) => {
  try {
    const verifiedPayload = jwt.verify(
      token,
      process.env.RESET_PASS_TOKEN as string
    ) as JwtPayload;
    return {
      success: true,
      message: "Token is valid",
      payload: verifiedPayload,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || "Invalid token",
    };
  }
};


