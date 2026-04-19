import { AlertCircle } from "lucide-react"

import { BaseButton } from "@/components/ui/base-button"
import { SecondaryButton } from "@/components/ui/secondary-button"
import { cn } from "@/lib/utils"

import type { Conversation } from "../conversation.types"
import { ConversationListItem } from "./ConversationListItem"
import { ConversationListSkeleton } from "./shimmer/ConversationListSkeleton"

type ConversationListErrorProps = {
  error: unknown
  onRetry: () => void
}

function ConversationListError({ error, onRetry }: ConversationListErrorProps) {
  const message =
    error instanceof Error ? error.message : "Something went wrong."

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-destructive/25 bg-destructive/5 px-4 py-8 text-center">
      <AlertCircle
        className="size-10 text-destructive"
        strokeWidth={2}
        aria-hidden
      />
      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">Could not load conversations</p>
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
  )
}

export type ConversationListProps = {
  conversations: Conversation[]
  isPending: boolean
  isError: boolean
  error: unknown
  onRetry: () => void
  selectedConversation: Conversation | null
  onSelectConversation: (conversation: Conversation) => void
  onRequestNewChat?: () => void
  className?: string
}

export function ConversationList({
  conversations,
  isPending,
  isError,
  error,
  onRetry,
  selectedConversation,
  onSelectConversation,
  onRequestNewChat,
  className,
}: ConversationListProps) {
  return (
    <aside
      className={cn(
        "flex min-h-0 min-w-0 w-full flex-1 flex-col border-b border-border bg-card/25 md:grow-0 md:shrink md:basis-72 md:max-w-sm md:min-w-0 md:border-b-0 md:border-r",
        className,
      )}
      aria-label="Conversations"
    >
      <div className="shrink-0 border-b border-border px-4 py-3 sm:px-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            Conversations
          </h2>
          {onRequestNewChat ? (
            <BaseButton
              type="button"
              variant="outline"
              size="sm"
              className="shrink-0 rounded-lg text-xs"
              onClick={() => onRequestNewChat()}
            >
              New chat
            </BaseButton>
          ) : null}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3 sm:px-4">
        {isPending ? <ConversationListSkeleton /> : null}

        {isError ? (
          <ConversationListError error={error} onRetry={onRetry} />
        ) : null}

        {!isPending && !isError && conversations.length > 0 ? (
          <div className="flex flex-col gap-2" role="listbox" aria-label="Conversation list">
            {conversations.map((c) => (
              <ConversationListItem
                key={c.id}
                conversation={c}
                selected={selectedConversation?.id === c.id}
                onSelect={() => onSelectConversation(c)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </aside>
  )
}
