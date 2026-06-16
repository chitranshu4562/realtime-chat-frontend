import { useQuery } from "@tanstack/react-query"

import { getMessageDetails } from "../conversation.api"

export function useFetchMessageDetails(messageId: number | null) {
  return useQuery({
    queryKey: ["message-details", messageId],
    queryFn: () => getMessageDetails({ messageId: messageId! }),
    enabled: messageId !== null,
  })
}
