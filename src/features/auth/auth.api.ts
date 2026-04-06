import http from "@/lib/http"

import type {
  LoginRequestBody,
  LoginResponseData,
  SendOtpRequestBody,
  SignupRequestBody,
  SignupResponseData,
  VerifyOtpRequestBody,
  VerifyOtpResponseData,
} from "./auth.types"

export type {
  LoginRequestBody,
  LoginResponseData,
  SendOtpRequestBody,
  SignupRequestBody,
  SignupResponseData,
  VerifyOtpRequestBody,
  VerifyOtpResponseData,
} from "./auth.types"

export async function sendOtp(email: string) {
  const body: SendOtpRequestBody = { email }
  return http.post<unknown, SendOtpRequestBody>("/auth/send-otp", body)
}

export async function verifyOtp(
  email: string,
  otp: string,
): Promise<VerifyOtpResponseData> {
  const body: VerifyOtpRequestBody = { email, otp }
  const res = await http.post<VerifyOtpResponseData, VerifyOtpRequestBody>(
    "/auth/verify-otp",
    body,
  )
  const token = res.data.data?.verifiedEmailToken
  if (!token) {
    throw new Error("Verification succeeded but no token was returned.")
  }
  return { verifiedEmailToken: token }
}

export async function signup(
  body: SignupRequestBody,
): Promise<SignupResponseData> {
  const res = await http.post<SignupResponseData, SignupRequestBody>(
    "/auth/signup",
    body,
  )
  const accessToken = res.data.data?.accessToken
  if (!accessToken) {
    throw new Error("Sign up succeeded but no access token was returned.")
  }
  return { accessToken }
}

/** POST /api/v1/login (base URL includes `/api/v1`). */
export async function login(
  body: LoginRequestBody,
): Promise<LoginResponseData> {
  const res = await http.post<LoginResponseData, LoginRequestBody>(
    "/auth/login",
    body,
  )
  const accessToken = res.data.data?.accessToken
  if (!accessToken) {
    throw new Error("Sign in succeeded but no access token was returned.")
  }
  return { accessToken }
}

/** POST /api/v1/auth/logout (base URL includes `/api/v1`). */
export async function logout() {
  return http.post<unknown>("/auth/logout")
}
