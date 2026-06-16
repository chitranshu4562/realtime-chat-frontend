import * as React from "react"
import { DropdownMenu } from "radix-ui"
import { Info, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

import type { Message } from "../conversation.types"
import { MessageStatusIcon } from "./MessageStatusIcon"
import { MessageDetailsDialog } from "./MessageDetailsDialog"

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

const menuContentClass = cn(
  "z-50 min-w-[9rem] overflow-hidden rounded-xl border p-1 shadow-lg",
  "border-[hsl(var(--color-border-default))] bg-popover text-popover-foreground",
  "data-[state=open]:animate-in data-[state=closed]:animate-out",
  "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
)

const menuItemClass = cn(
  "relative flex cursor-pointer select-none items-center gap-2 rounded-lg px-2.5 py-2 text-sm outline-none",
  "text-foreground focus:bg-accent data-[highlighted]:bg-accent",
)

export type MessageListItemProps = {
  message: Message
  isSent: boolean
}

export function MessageListItem({ message, isSent }: MessageListItemProps) {
  const timeLabel = formatMessageTime(message.createdAt)
  const [detailsOpen, setDetailsOpen] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <>
      <div
        className={cn("group flex w-full items-end gap-1", isSent ? "justify-end" : "justify-start")}
        role="listitem"
      >
        {/* "..." button — left side for received, hidden until hovered */}
        {!isSent && (
          <DropdownMenu.Root open={menuOpen} onOpenChange={setMenuOpen} modal={false}>
            <DropdownMenu.Trigger asChild>
              <button
                type="button"
                aria-label="Message options"
                className={cn(
                  "mb-1 flex size-6 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-opacity",
                  "opacity-0 group-hover:opacity-100 focus-visible:opacity-100 [@media(hover:none)]:opacity-100",
                  menuOpen && "opacity-100",
                )}
              >
                <MoreHorizontal className="size-4" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className={menuContentClass} sideOffset={4} align="start">
                <DropdownMenu.Item
                  className={menuItemClass}
                  onSelect={() => setDetailsOpen(true)}
                >
                  <Info className="size-4 opacity-70" />
                  Details
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        )}

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
            <div
              className={cn(
                "mt-1 flex items-center gap-0.5",
                isSent ? "justify-end" : "justify-start",
              )}
            >
              <p
                className={cn(
                  "text-xs tabular-nums",
                  isSent ? "text-primary/80" : "text-muted-foreground",
                )}
              >
                {timeLabel}
              </p>
              {isSent && <MessageStatusIcon status={message.status} />}
            </div>
          ) : null}
        </div>

        {/* "..." button — right side for sent messages */}
        {isSent && (
          <DropdownMenu.Root open={menuOpen} onOpenChange={setMenuOpen} modal={false}>
            <DropdownMenu.Trigger asChild>
              <button
                type="button"
                aria-label="Message options"
                className={cn(
                  "mb-1 flex size-6 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-opacity",
                  "opacity-0 group-hover:opacity-100 focus-visible:opacity-100 [@media(hover:none)]:opacity-100",
                  menuOpen && "opacity-100",
                )}
              >
                <MoreHorizontal className="size-4" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className={menuContentClass} sideOffset={4} align="end">
                <DropdownMenu.Item
                  className={menuItemClass}
                  onSelect={() => setDetailsOpen(true)}
                >
                  <Info className="size-4 opacity-70" />
                  Details
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        )}
      </div>

      <MessageDetailsDialog
        messageId={message.id}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </>
  )
}
