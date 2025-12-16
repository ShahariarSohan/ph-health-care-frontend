"use server"

import { revalidateTag } from "next/cache";

const revalidate =async (tag:string) => {
   return revalidateTag(tag,{expire:0})
};

export default revalidate;