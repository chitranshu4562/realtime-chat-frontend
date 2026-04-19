import { queryClient } from "@/lib/queryClient"
import type {
  FetchConversationListQueryParams,
  FetchMessagesQueryParams,
} from "./conversation.types"

export const conversationKeys = {
  all: ["conversations"] as const,
  lists: () => [...conversationKeys.all, "list"] as const,
  list: (params: FetchConversationListQueryParams) =>
    [...conversationKeys.lists(), params] as const,
  details: () => [...conversationKeys.all, "detail"] as const,
  detail: (id: number) => [...conversationKeys.details(), id] as const,
  messages: () => [...conversationKeys.all, "messages"] as const,
  messagesList: (params: FetchMessagesQueryParams) =>
    [...conversationKeys.messages(), params] as const,
}

export const conversationCache = {
  invalidateAll: () =>
    queryClient.invalidateQueries({ queryKey: conversationKeys.all }),
  invalidateLists: () =>
    queryClient.invalidateQueries({ queryKey: conversationKeys.lists() }),
  invalidateDetail: (id: number) =>
    queryClient.invalidateQueries({ queryKey: conversationKeys.detail(id) }),
  invalidateMessages: (params: FetchMessagesQueryParams) =>
    queryClient.invalidateQueries({
      queryKey: conversationKeys.messagesList(params),
    }),
  invalidateAllMessages: () =>
    queryClient.invalidateQueries({ queryKey: conversationKeys.messages() }),
}
