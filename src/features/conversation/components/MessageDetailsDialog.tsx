import { Check, CheckCheck, Clock, Loader2, AlertCircle } from "lucide-react"
import { AppModal } from "@/components/ui/app-modal"
import { useFetchMessageDetails } from "../hooks/useFetchMessageDetails"
import type { MessageStatus } from "../conversation.types"

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  month: "short",
  day: "numeric",
})

function formatTime(iso: string) {
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? "" : timeFormatter.format(d)
}

function StatusBadge({ status }: { status: MessageStatus }) {
  if (status === "PENDING") {
    return (
      <span className="flex items-center gap-1 text-xs text-muted-foreground">
        <Clock className="size-3.5" />
        Sent
      </span>
    )
  }
  if (status === "DELIVERED") {
    return (
      <span className="flex items-center gap-1 text-xs text-muted-foreground">
        <CheckCheck className="size-3.5" />
        Delivered
      </span>
    )
  }
  return (
    <span className="flex items-center gap-1 text-xs text-blue-500">
      <CheckCheck className="size-3.5" />
      Read
    </span>
  )
}

function Avatar({ name }: { name: string | null }) {
  const initials = (name ?? "?")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0] ?? "")
    .join("")
    .toUpperCase() || "?"

  return (
    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground ring-1 ring-border">
      {initials}
    </span>
  )
}

type MessageDetailsDialogProps = {
  messageId: number | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MessageDetailsDialog({ messageId, open, onOpenChange }: MessageDetailsDialogProps) {
  const { data, isPending, isError } = useFetchMessageDetails(open ? messageId : null)

  return (
    <AppModal.Root variant="dialog" open={open} onOpenChange={onOpenChange}>
      <AppModal.Overlay />
      <AppModal.Content
        className="flex max-h-[min(90vh,36rem)] w-[calc(100%-2rem)] max-w-md flex-col p-0 sm:p-0"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {/* header */}
        <div className="shrink-0 border-b border-border/80 px-4 py-3 sm:px-5">
          <AppModal.Title className="text-base font-semibold">Message info</AppModal.Title>
          {data && (
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
              {data.content}
            </p>
          )}
        </div>

        {/* body */}
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3 sm:px-5">
          {isPending && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="size-6 animate-spin text-muted-foreground" />
            </div>
          )}

          {isError && (
            <div className="flex flex-col items-center gap-2 py-12 text-center text-muted-foreground">
              <AlertCircle className="size-8 text-destructive" />
              <p className="text-sm">Could not load message info.</p>
            </div>
          )}

          {data && (
            <div className="flex flex-col gap-5">
              {/* sender */}
              <section>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  From
                </p>
                <div className="flex items-center gap-3 rounded-xl border border-border bg-card/40 p-3">
                  <Avatar name={data.sender.name} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {data.sender.name ?? "Unknown"}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Sent · {formatTime(data.createdAt)}
                    </p>
                  </div>
                  <Check className="size-4 shrink-0 text-muted-foreground" strokeWidth={2.5} />
                </div>
              </section>

              {/* recipients */}
              {data.statuses.length > 0 && (
                <section>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Recipients
                  </p>
                  <div className="flex flex-col gap-2">
                    {data.statuses.map((s) => (
                      <div
                        key={s.recipientId}
                        className="flex items-center gap-3 rounded-xl border border-border bg-card/40 p-3"
                      >
                        <Avatar name={s.recipientName} />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-foreground">
                            {s.recipientName ?? "Unknown"}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {formatTime(s.updatedAt)}
                          </p>
                        </div>
                        <StatusBadge status={s.statusType} />
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      </AppModal.Content>
    </AppModal.Root>
  )
}
