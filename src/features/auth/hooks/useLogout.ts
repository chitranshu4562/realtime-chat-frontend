import { useMutation } from "@tanstack/react-query"

import { notifyError } from "@/lib/toast"
import { getApiErrorMessage } from "@/lib/utils"

import { logout as logoutRequest } from "../auth.api"

export function useLogout() {
  return useMutation({
    mutationFn: () => logoutRequest(),
    onError: (error) => {
      notifyError(getApiErrorMessage(error, "Could not sign out. Please try again."))
    },
  })
}
