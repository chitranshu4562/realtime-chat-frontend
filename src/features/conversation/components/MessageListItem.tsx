import { cn } from "@/lib/utils"

import type { Message } from "../conversation.types"

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
})

function formatMessageTime(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) {
    return ""
  }
  return timeFormatter.format(date)
}

export type MessageListItemProps = {
  message: Message
  isSent: boolean
}

export function MessageListItem({ message, isSent }: MessageListItemProps) {
  const timeLabel = formatMessageTime(message.createdAt)

  return (
    <div
      className={cn("flex w-full", isSent ? "justify-end" : "justify-start")}
      role="listitem"
    >
      <div
        className={cn(
          "max-w-[min(85%,28rem)] rounded-2xl border px-3 py-2 shadow-sm",
          isSent
            ? "border-primary/20 bg-primary/10 text-foreground"
            : "border-border bg-muted text-foreground",
        )}
      >
        <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
          {message.content}
        </p>
        {timeLabel ? (
          <p
            className={cn(
              "mt-1 text-xs tabular-nums",
              isSent ? "text-primary/80" : "text-muted-foreground",
            )}
          >
            {timeLabel}
          </p>
        ) : null}
      </div>
    </div>
  )
}
