/** Request body for POST /auth/send-otp */
export type SendOtpRequestBody = {
  email: string
}

/** Request body for POST /auth/verify-otp */
export type VerifyOtpRequestBody = {
  email: string
  otp: string
}

/** Payload in ApiResponse.data for POST /auth/verify-otp */
export type VerifyOtpResponseData = {
  verifiedEmailToken: string
}

/** Request body for POST /auth/signup */
export type SignupRequestBody = {
  verifiedEmailToken: string
  name: string
  phoneNumber: string
  password: string
  confirmPassword: string
}

/** Payload in ApiResponse.data for POST /auth/signup */
export type SignupResponseData = {
  accessToken: string
}

/** Request body for POST /login */
export type LoginRequestBody = {
  email: string
  password: string
}

/** Payload in ApiResponse.data for POST /login */
export type LoginResponseData = {
  accessToken: string
}
