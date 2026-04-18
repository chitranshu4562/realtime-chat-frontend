import { useQuery } from "@tanstack/react-query"

import { fetchConversationList } from "../conversation.api"
import { conversationKeys } from "../conversation.cache"
import type { FetchConversationListQueryParams } from "../conversation.types"

export type UseFetchConversationListOptions = {
  /** When false, the list is not requested (e.g. while a screen is inactive). */
  enabled?: boolean
}

export function useFetchConversationList(
  params: FetchConversationListQueryParams = {},
  { enabled = true }: UseFetchConversationListOptions = {},
) {
  return useQuery({
    queryKey: conversationKeys.list(params),
    queryFn: () => fetchConversationList(),
    placeholderData: (prev) => prev,
    enabled,
  })
}
