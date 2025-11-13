"use server";

import jwt, { JwtPayload } from "jsonwebtoken";
import { getCookie } from "./tokenHandlers";
import { IUserInfo } from "@/types/user.interface";

const getUserInfo = async (): Promise<IUserInfo | null> => {
  try {
    const accessToken = await getCookie("accessToken");
    if (!accessToken) {
      return null;
    }
    const verifiedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as JwtPayload;

    if (!verifiedToken) {
      return null
    }
    const userInfo:IUserInfo = {
      email: verifiedToken.email,
      role: verifiedToken.role,
    };
    return userInfo;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default getUserInfo;
