import { z } from "zod"

export const loginSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

export const sendOtpSchema = z.object({
  email: z.email("Enter a valid email address"),
})

export const verifyOtpSchema = z.object({
  otp: z
    .string()
    .regex(/^\d{6}$/, "Enter the 6-digit code"),
})

const passwordPolicyRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,64}$/

const phoneNumberRegex = /^[6-9]\d{9}$/

export const signupSchema = z
  .object({
    verifiedEmailToken: z.string().min(1, "Session expired. Verify your email again."),
    name: z.string().trim().min(1, "Name is required").max(120),
    phoneNumber: z
      .string()
      .regex(phoneNumberRegex, "Enter a valid 10-digit mobile number"),
    password: z
      .string()
      .regex(
        passwordPolicyRegex,
        "8–64 characters with upper, lower, number, and special character",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type LoginValues = z.infer<typeof loginSchema>
export type SendOtpValues = z.infer<typeof sendOtpSchema>
export type VerifyOtpValues = z.infer<typeof verifyOtpSchema>
export type SignupValues = z.infer<typeof signupSchema>
