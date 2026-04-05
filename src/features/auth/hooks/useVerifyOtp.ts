import { useMutation } from "@tanstack/react-query"

import { notifyError, notifySuccess } from "@/lib/toast"
import { getApiErrorMessage } from "@/lib/utils"

import { verifyOtp } from "../auth.api"
import type { VerifyOtpRequestBody } from "../auth.types"

export function useVerifyOtp() {
  return useMutation({
    mutationFn: ({ email, otp }: VerifyOtpRequestBody) => verifyOtp(email, otp),
    onSuccess: () => notifySuccess("Email verified"),
    onError: (error) => {
      notifyError(
        getApiErrorMessage(error, "Invalid or expired code. Please try again."),
      )
    },
  })
}
