import { useState } from "react"

import { cn } from "@/lib/utils"

import { useFetchConversationList } from "../hooks/useFetchConversationList"
import type { Conversation } from "../conversation.types"
import { ChatRoomPanel } from "./ChatRoomPanel"
import { ConversationList } from "./ConversationList"
import { MembersDialog } from "./MembersDialog"
import { NoConversationFound } from "./NoConversationFound"

export type ConversationDashboardProps = {
  className?: string
}

export function ConversationDashboard({ className }: ConversationDashboardProps) {
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null)
  const [membersOpen, setMembersOpen] = useState(false)

  const { data, isPending, isError, error, refetch } =
    useFetchConversationList()

  const conversations = data?.conversations ?? []
  const showNoConversationFound =
    !isPending && !isError && conversations.length === 0

  function openMembersDialog() {
    setMembersOpen(true)
  }

  return (
    <>
      {showNoConversationFound ? (
        <div
          className={cn(
            "flex min-h-0 flex-1 flex-col items-center justify-center px-4 py-10",
            className,
          )}
        >
          <NoConversationFound onStartNewChat={openMembersDialog} />
        </div>
      ) : (
        <div
          className={cn(
            "flex min-h-0 flex-1 flex-col md:flex-row",
            className,
          )}
        >
          <ConversationList
            conversations={conversations}
            isPending={isPending}
            isError={isError}
            error={error}
            onRetry={() => void refetch()}
            selectedConversation={selectedConversation}
            onSelectConversation={setSelectedConversation}
            onRequestNewChat={openMembersDialog}
          />
          <ChatRoomPanel
            selectedConversation={selectedConversation}
            className="min-h-[50vh] md:min-h-0"
          />
        </div>
      )}
      <MembersDialog open={membersOpen} onOpenChange={setMembersOpen} />
    </>
  )
}
