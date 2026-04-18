import { useMutation } from "@tanstack/react-query"

import { notifyError } from "@/lib/toast"
import { getApiErrorMessage } from "@/lib/utils"

import { conversationCache } from "../conversation.cache"
import { createConversation } from "../conversation.api"
import type { CreateConversationRequestBody } from "../conversation.types"

export function useCreateConversation() {
  return useMutation({
    mutationFn: (body: CreateConversationRequestBody) => createConversation(body),
    onSuccess: () => {
      void conversationCache.invalidateLists()
    },
    onError: (error) => {
      notifyError(
        getApiErrorMessage(error, "Could not create conversation. Please try again."),
      )
    },
  })
}
