import { useMutation } from "@tanstack/react-query"

import { notifyError, notifySuccess } from "@/lib/toast"
import { getApiErrorMessage } from "@/lib/utils"

import { signup } from "../auth.api"
import type { SignupRequestBody } from "../auth.types"

export function useSignup() {
  return useMutation({
    mutationFn: (body: SignupRequestBody) => signup(body),
    onSuccess: () => notifySuccess("Account created"),
    onError: (error) => {
      notifyError(getApiErrorMessage(error, "Could not create account. Please try again."))
    },
  })
}
