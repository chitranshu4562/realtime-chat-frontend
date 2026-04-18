import { useQuery } from "@tanstack/react-query"
import { fetchUserList } from "../user.api"
import { userKeys } from "../user.cache"
import type { FetchUserListQueryParams } from "../user.types"

export type UseFetchUserListOptions = {
  /** When false, the list is not requested (e.g. while a picker dialog is closed). */
  enabled?: boolean
}

export function useFetchUserList(
  params: FetchUserListQueryParams = {},
  { enabled = true }: UseFetchUserListOptions = {},
) {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => fetchUserList(params),
    placeholderData: (prev) => prev,
    enabled,
  })
}