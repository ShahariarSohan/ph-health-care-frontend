import { z } from "zod";

export const updatePatientZodSchema = z.object({
  id:z.string(),
  name: z.string().min(3, "Name cannot be empty").optional(),
  address: z.string().optional(),
  isDeleted: z.boolean().optional(),
});
