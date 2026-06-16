import { AlertCircle, Loader2 } from "lucide-react"
import { useEffect, useRef } from "react"

import { SecondaryButton } from "@/components/ui/secondary-button"
import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { cn } from "@/lib/utils"

import type { Conversation } from "../conversation.types"
import { useConversationSocket } from "../hooks/useConversationSocket"
import { useFetchMessages } from "../hooks/useFetchMessages"
import { MessageComposer } from "./MessageComposer"
import { MessageListItem } from "./MessageListItem"

export type ActiveChatRoomProps = {
  conversation: Conversation
  className?: string
}

type MessagesErrorProps = {
  error: unknown
  onRetry: () => void
}

function MessagesError({ error, onRetry }: MessagesErrorProps) {
  const message =
    error instanceof Error ? error.message : "Something went wrong."

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center gap-4 p-6">
      <div className="flex max-w-sm flex-col items-center gap-3 rounded-xl border border-destructive/25 bg-destructive/5 px-4 py-8 text-center">
        <AlertCircle
          className="size-10 text-destructive"
          strokeWidth={2}
          aria-hidden
        />
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">Could not load messages</p>
          <p className="text-xs text-muted-foreground">{message}</p>
        </div>
        <SecondaryButton
          type="button"
          className="rounded-xl"
          onClick={() => void onRetry()}
        >
          Try again
        </SecondaryButton>
      </div>
    </div>
  )
}

export function ActiveChatRoom({ conversation, className }: ActiveChatRoomProps) {
  const { emitMessageSend } = useConversationSocket(conversation.id)
  const loggedInUserId = useAuthStore((state) => state.user?.id)
  const currentUserNumericId = loggedInUserId === undefined ? NaN : Number(loggedInUserId)

  const {
    data,
    isPending,
    isError,
    error,
    refetch,
  } = useFetchMessages({ conversationId: conversation.id })

  const title =
    conversation.type === "GROUP"
      ? (conversation.name?.trim() || "Group")
      : (conversation.members.find((m) => m.id !== currentUserNumericId)?.name?.trim() || `Conversation ${conversation.id}`)

  const messages = data?.messages ?? []
  const messageCount = messages.length

  const bottomRef = useRef<HTMLDivElement>(null)
  const prevConversationId = useRef(conversation.id)

  useEffect(() => {
    if (!bottomRef.current || messageCount === 0) return
    const behavior = prevConversationId.current !== conversation.id ? "instant" : "smooth"
    prevConversationId.current = conversation.id
    bottomRef.current.scrollIntoView({ behavior, block: "end" })
  }, [conversation.id, messageCount])

  return (
    <section
      className={cn(
        "flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-[hsl(var(--color-bg-page))]",
        className,
      )}
      aria-label={`Chat with ${title}`}
    >
      <header className="min-w-0 shrink-0 border-b border-border px-4 py-3 sm:px-6">
        <h2 className="truncate text-base font-semibold tracking-tight text-foreground">
          {title}
        </h2>
      </header>

      {isPending ? (
        <div
          className="flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center overflow-y-auto overflow-x-hidden p-6"
          aria-busy="true"
          aria-label="Loading messages"
        >
          <Loader2
            className="size-8 shrink-0 animate-spin text-muted-foreground"
            strokeWidth={2}
            aria-hidden
          />
          <span className="sr-only">Loading messages</span>
        </div>
      ) : null}

      {isError ? <MessagesError error={error} onRetry={refetch} /> : null}

      {!isPending && !isError && messageCount === 0 ? (
        <div className="flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center overflow-y-auto overflow-x-hidden p-6">
          <p className="max-w-sm text-center text-sm text-muted-foreground">
            Start the conversation by sending a message below.
          </p>
        </div>
      ) : null}

      {!isPending && !isError && messageCount > 0 ? (
        <div
          className="flex min-h-0 min-w-0 flex-1 flex-col gap-2 overflow-y-auto overflow-x-hidden p-4 sm:p-6"
          role="list"
          aria-label="Messages"
        >
          {messages.map((message) => (
            <MessageListItem
              key={message.id}
              message={message}
              isSent={
                Number.isFinite(currentUserNumericId) &&
                currentUserNumericId === message.senderId
              }
            />
          ))}
          <div ref={bottomRef} />
        </div>
      ) : null}

      <footer className="min-w-0 shrink-0 border-t border-border bg-[hsl(var(--color-bg-page))] p-3 sm:p-4">
        <MessageComposer
          conversationId={conversation.id}
          onSend={emitMessageSend}
        />
      </footer>
    </section>
  )
}
