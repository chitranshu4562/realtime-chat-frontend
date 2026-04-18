import { queryClient } from "@/lib/queryClient"
import type { FetchUserListQueryParams } from "./user.types"

export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (params: FetchUserListQueryParams) =>
    [...userKeys.lists(), params] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
}

export const userCache = {
  invalidateAll: () =>
    queryClient.invalidateQueries({ queryKey: userKeys.all }),
  invalidateLists: () =>
    queryClient.invalidateQueries({ queryKey: userKeys.lists() }),
  invalidateDetail: (id: string) =>
    queryClient.invalidateQueries({ queryKey: userKeys.detail(id) }),
}