/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { serverFetch } from "@/lib/serverFetch";
import { revalidateTag } from "next/cache";

const updateMyProfile = async (formData: FormData) => {
  try {
    const uploadFormData = new FormData();
    const data: any = {};

    formData.forEach((value,key) => {
      if (key !== "file" && value) {
        data[key] = value;
      }
    });
    uploadFormData.append("data", JSON.stringify(data));
    const file = formData.get("file");
    if (file && file instanceof File && file.size > 0) {
      uploadFormData.append("file", file);
      }
      const res = await serverFetch.patch("/user/update-my-profile", { body: uploadFormData })
      const result = await res.json();
      revalidateTag("USERINFO", {expire:0})
      return result
  } catch (err: any) {
      console.log(err)
       return {
         success: false,
         message: `${
           process.env.NODE_ENV === "development" ? err.message : "Something went wrong"
         }`,
       };
  }
};

export default updateMyProfile;
