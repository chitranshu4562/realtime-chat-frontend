import { z } from "zod"

export const signupEmailSchema = z.object({
  email: z.email("Enter a valid email address"),
})

export const signupOtpSchema = z.object({
  otp: z
    .string()
    .regex(/^\d{6}$/, "Enter the 6-digit code"),
})

export const signupRegisterSchema = z
  .object({
    email: z.email("Enter a valid email address"),
    name: z.string().trim().min(1, "Name is required").max(120),
    phone: z
      .string()
      .trim()
      .min(1, "Phone number is required")
      .regex(/^\+?[\d\s()-]{8,20}$/, "Enter a valid phone number"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type SignupEmailValues = z.infer<typeof signupEmailSchema>
export type SignupOtpValues = z.infer<typeof signupOtpSchema>
export type SignupRegisterValues = z.infer<typeof signupRegisterSchema>
