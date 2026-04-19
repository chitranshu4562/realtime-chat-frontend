import { cn } from "@/lib/utils"

import type { Conversation } from "../conversation.types"

const rowClass = cn(
  "flex w-full cursor-pointer items-center gap-3 rounded-xl border border-border bg-card/40 p-3.5 text-left transition-all",
  "hover:border-primary/35 hover:bg-[hsl(var(--color-nav-item-bg-hover))]",
  "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
)

const rowSelectedClass = cn(
  "border-primary/60 bg-primary/8 shadow-[0_0_0_1px_hsl(var(--primary)/0.12)]",
)

export type ConversationListItemProps = {
  conversation: Conversation
  selected: boolean
  onSelect: () => void
}

export function ConversationListItem({
  conversation,
  selected,
  onSelect,
}: ConversationListItemProps) {
  const member = conversation.members.find((m) => !m.isAdmin);
  const title = member?.name.trim() || `Conversation ${conversation.id}`;

  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      className={cn(rowClass, selected && rowSelectedClass)}
      onClick={onSelect}
    >
      <span
        className={cn(
          "flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
          "bg-muted text-foreground ring-1 ring-border",
          selected && "bg-primary/15 text-primary ring-primary/25",
        )}
        aria-hidden
      >
        {title.slice(0, 2).toUpperCase()}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-foreground">
          {title}
        </span>
        <span className="mt-0.5 block truncate text-xs text-muted-foreground capitalize">
          {conversation.type.toLowerCase()}
        </span>
      </span>
    </button>
  )
}
