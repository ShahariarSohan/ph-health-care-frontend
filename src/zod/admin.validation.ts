import { z } from "zod";


export const createAdminZodSchema = z.object({
 
    name: z.string().min(1, "Name is required."),
    email: z.email("Invalid email format."),
    password: z.string().min(5, "Password must be at least 5 characters."),
    contactNumber: z.string().min(11,"Minimum 11 characters"),
    profilePhoto: z.string().optional(),
 
});

export const updateAdminZodSchema = z.object({
    name: z.string().min(3).optional(),
    contactNumber: z.string().optional(),
    profilePhoto: z.string().optional(),
    isDeleted: z.boolean().optional(),
});
