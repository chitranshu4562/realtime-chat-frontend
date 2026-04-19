import { cn } from "@/lib/utils"

import type { Conversation } from "../conversation.types"

import { ActiveChatRoom } from "./ActiveChatRoom"
import { ChatRoomEmptyState } from "./ChatRoomEmptyState"

export type ChatRoomPanelProps = {
  selectedConversation: Conversation | null
  className?: string
}

export function ChatRoomPanel({
  selectedConversation,
  className,
}: ChatRoomPanelProps) {
  const panelClass = cn(
    "flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden",
    className,
  )

  if (selectedConversation) {
    return (
      <ActiveChatRoom
        conversation={selectedConversation}
        className={panelClass}
      />
    )
  }

  return <ChatRoomEmptyState className={panelClass} />
}
