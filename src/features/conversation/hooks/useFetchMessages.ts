import { useQuery } from "@tanstack/react-query"

import { getMessages } from "../conversation.api"
import { conversationKeys } from "../conversation.cache"
import type { FetchMessagesQueryParams } from "../conversation.types"

export type UseFetchMessagesOptions = {
  /** When false, messages are not requested (e.g. while the room is inactive). */
  enabled?: boolean
}

export function useFetchMessages(
  params: FetchMessagesQueryParams,
  { enabled = true }: UseFetchMessagesOptions = {},
) {
  const canFetch = Number.isFinite(params.conversationId) && params.conversationId > 0

  return useQuery({
    queryKey: conversationKeys.messagesList(params),
    queryFn: () => getMessages(params),
    placeholderData: (previousData) => previousData,
    enabled: enabled && canFetch,
  })
}
