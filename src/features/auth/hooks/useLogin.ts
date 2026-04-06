import { useMutation } from "@tanstack/react-query"

import { notifyError, notifySuccess } from "@/lib/toast"
import { getApiErrorMessage } from "@/lib/utils"

import { login } from "../auth.api"
import type { LoginRequestBody } from "../auth.types"

export function useLogin() {
  return useMutation({
    mutationFn: (body: LoginRequestBody) => login(body),
    onSuccess: () => notifySuccess("Signed in"),
    onError: (error) => {
      notifyError(getApiErrorMessage(error, "Could not sign in. Please try again."))
    },
  })
}
