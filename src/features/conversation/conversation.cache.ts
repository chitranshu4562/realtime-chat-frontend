import { queryClient } from "@/lib/queryClient"
import type { FetchConversationListQueryParams } from "./conversation.types"

export const conversationKeys = {
  all: ["conversations"] as const,
  lists: () => [...conversationKeys.all, "list"] as const,
  list: (params: FetchConversationListQueryParams) =>
    [...conversationKeys.lists(), params] as const,
  details: () => [...conversationKeys.all, "detail"] as const,
  detail: (id: number) => [...conversationKeys.details(), id] as const,
}

export const conversationCache = {
  invalidateAll: () =>
    queryClient.invalidateQueries({ queryKey: conversationKeys.all }),
  invalidateLists: () =>
    queryClient.invalidateQueries({ queryKey: conversationKeys.lists() }),
  invalidateDetail: (id: number) =>
    queryClient.invalidateQueries({ queryKey: conversationKeys.detail(id) }),
}
