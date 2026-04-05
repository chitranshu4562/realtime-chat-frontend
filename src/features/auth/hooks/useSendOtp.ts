import { useMutation } from "@tanstack/react-query"

import { notifyError, notifySuccess } from "@/lib/toast"
import { getApiErrorMessage } from "@/lib/utils"

import { sendOtp } from "../auth.api"
import type { SendOtpRequestBody } from "../auth.types"

export function useSendOtp() {
  return useMutation({
    mutationFn: (body: SendOtpRequestBody) => sendOtp(body.email),
    onSuccess: () => notifySuccess("OTP sent to your email"),
    onError: (error) => {
      notifyError(getApiErrorMessage(error, "Could not send the code. Please try again."))
    },
  })
}
