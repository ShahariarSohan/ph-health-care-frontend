import z from "zod";

export const registerPatientValidationSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must not be more than 100 characters"),
    email: z.email("Invalid email address"),
    address: z.string().optional(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password must not be more than 100 characters"),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters")
      .max(100, "Confirm Password must not be more than 100 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Password do not match",
    path: ["confirmPassword"],
  });


  export const loginValidationZodSchema = z.object({
    email: z.email("Invalid email address"),
    password: z
      .string()
      .min(5, " Password is required and must be at least 5 characters")
      .max(100, "Password must not be more than 100 characters"),
  });

  export const resetPasswordSchema = z
    .object({
      newPassword: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z
        .string()
        .min(6, "Password must be at least 6 characters"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Password don't match",
      path: ["confirmPassword"],
    });

    export const forgotPasswordSchema = z.object({
      email: z.email("Please enter a valid email address"),
    });

    export const changePasswordSchema = z
      .object({
        oldPassword: z
          .string()
          .min(6, "Password must be at least 6 characters"),
        newPassword: z
          .string()
          .min(6, "Password must be at least 6 characters"),
        confirmPassword: z
          .string()
          .min(6, "Password must be at least 6 characters"),
      })
      .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
      });