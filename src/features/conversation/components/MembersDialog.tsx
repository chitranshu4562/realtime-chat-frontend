import * as React from "react"
import { AlertCircle, Check, MessageCircle, Users } from "lucide-react"
import { motion } from "framer-motion"

import { AppModal } from "@/components/ui/app-modal"
import { BaseButton } from "@/components/ui/base-button"
import { SecondaryButton } from "@/components/ui/secondary-button"
import { useCreateConversation } from "@/features/conversation/hooks/useCreateConversation"
import { useFetchUserList } from "@/features/user/hooks/useFetchUserList"
import type { User } from "@/features/user/user.types"
import { notifyError } from "@/lib/toast"
import { cn } from "@/lib/utils"

const SKELETON_ROW_COUNT = 6

function initialsFromUser(user: User): string {
  const source = user.name.trim() || user.email.trim()
  if (!source) return "?"
  const parts = source.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return `${parts[0]![0] ?? ""}${parts[1]![0] ?? ""}`.toUpperCase() || "?"
  }
  return source.slice(0, 2).toUpperCase()
}

const memberRowClass = cn(
  "flex w-full cursor-pointer items-center gap-3 rounded-xl border border-border bg-card/40 p-3.5 text-left transition-all",
  "hover:border-primary/35 hover:bg-[hsl(var(--color-nav-item-bg-hover))]",
  "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
)

const memberRowSelectedClass = cn(
  "border-primary/60 bg-primary/8 shadow-[0_0_0_1px_hsl(var(--primary)/0.12)]",
)

function ShimmerBar({ className }: { className?: string }) {
  return (
    <span
      className={cn("relative block overflow-hidden rounded-md bg-muted", className)}
      aria-hidden
    >
      <motion.span
        className="pointer-events-none absolute inset-y-0 w-2/5 bg-gradient-to-r from-transparent via-foreground/12 to-transparent dark:via-foreground/18"
        initial={{ x: "-60%" }}
        animate={{ x: "280%" }}
        transition={{
          duration: 1.35,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </span>
  )
}

function MemberUserCardSkeleton() {
  return (
    <div
      className={cn(memberRowClass, "pointer-events-none cursor-default")}
      aria-hidden
    >
      <ShimmerBar className="size-11 shrink-0 rounded-full" />
      <span className="min-w-0 flex-1 space-y-2 py-0.5">
        <ShimmerBar className="h-4 w-[42%] max-w-[10rem]" />
        <ShimmerBar className="h-3 w-[68%] max-w-[14rem]" />
      </span>
      <span className="size-8 shrink-0 rounded-full bg-muted/80" />
    </div>
  )
}

function MembersListSkeleton() {
  return (
    <div className="flex flex-col gap-2" aria-busy="true" aria-label="Loading members">
      {Array.from({ length: SKELETON_ROW_COUNT }, (_, i) => (
        <MemberUserCardSkeleton key={i} />
      ))}
    </div>
  )
}

type MembersListErrorProps = {
  error: unknown
  onRetry: () => void
}

function MembersListError({ error, onRetry }: MembersListErrorProps) {
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
        <p className="text-sm font-medium text-foreground">Could not load members</p>
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

type MemberUserCardProps = {
  user: User
  selected: boolean
  onSelect: () => void
}

function MemberUserCard({ user, selected, onSelect }: MemberUserCardProps) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      className={cn(memberRowClass, selected && memberRowSelectedClass)}
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
        {initialsFromUser(user)}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-foreground">
          {user.name || "Unnamed"}
        </span>
        <span className="mt-0.5 block truncate text-xs text-muted-foreground">
          {user.email}
        </span>
      </span>
      {selected ? (
        <span
          className="flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary text-primary-foreground"
          aria-hidden
        >
          <Check className="size-4" strokeWidth={2.5} />
        </span>
      ) : (
        <span className="size-8 shrink-0" aria-hidden />
      )}
    </button>
  )
}

export type MembersDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Called when the user confirms starting a chat with the selected member. */
  onStartChat?: (user: User) => void
}

export function MembersDialog({
  open,
  onOpenChange,
  onStartChat,
}: MembersDialogProps) {
  const [selectedId, setSelectedId] = React.useState<string | null>(null)

  const { data, isPending, isError, error, refetch } = useFetchUserList(
    {},
    { enabled: open },
  )

  const { mutate: runCreateConversation, isPending: isCreatingConversation } =
    useCreateConversation()

  React.useEffect(() => {
    if (!open) {
      setSelectedId(null)
    }
  }, [open])

  const users = data?.users ?? []
  const selectedUser =
    selectedId === null
      ? null
      : users.find((u) => u.id === selectedId) ?? null

  function handleStart() {
    if (!selectedUser) return
    const memberId = Number.parseInt(selectedUser.id, 10)
    if (!Number.isFinite(memberId)) {
      notifyError("Could not start chat for this member. Please try again.")
      return
    }
    runCreateConversation(
      { type: "DIRECT", memberIds: [memberId] },
      {
        onSuccess: () => {
          onStartChat?.(selectedUser)
          onOpenChange(false)
        },
      },
    )
  }

  return (
    <AppModal.Root variant="dialog" open={open} onOpenChange={onOpenChange}>
      <AppModal.Overlay />
      <AppModal.Content
        className="flex max-h-[min(92vh,48rem)] min-h-[min(58vh,28rem)] w-[calc(100%-2rem)] max-w-lg flex-col p-0 sm:p-0"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="shrink-0 border-b border-border/80 bg-gradient-to-br from-primary/[0.07] via-transparent to-transparent px-4 py-3 sm:px-5">
          <div className="flex items-start gap-2.5">
            <div
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-xl",
                "bg-primary/12 text-primary ring-1 ring-primary/20",
              )}
              aria-hidden
            >
              <Users className="size-[1.125rem]" strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1">
              <AppModal.Title className="text-base font-semibold sm:text-lg">
                Members
              </AppModal.Title>
              <AppModal.Description className="mt-0.5 text-xs leading-snug sm:text-sm">
                Pick someone to start a conversation. You can change this later.
              </AppModal.Description>
            </div>
          </div>
        </div>

        <div
          className="min-h-0 flex-1 overflow-y-auto px-4 py-3 sm:px-5"
          role="listbox"
          aria-label="Team members"
        >
          {isPending ? <MembersListSkeleton /> : null}

          {isError ? (
            <MembersListError error={error} onRetry={() => void refetch()} />
          ) : null}

          {!isPending && !isError && users.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-center text-muted-foreground">
              <MessageCircle className="size-10 opacity-40" aria-hidden />
              <p className="text-sm">No members found.</p>
            </div>
          ) : null}

          {!isPending && !isError && users.length > 0 ? (
            <div className="flex flex-col gap-2">
              {users.map((user) => (
                <MemberUserCard
                  key={user.id}
                  user={user}
                  selected={user.id === selectedId}
                  onSelect={() => setSelectedId(user.id)}
                />
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center justify-end gap-2 border-t border-border px-4 py-2.5 sm:px-5">
          <AppModal.Dismiss asChild>
            <SecondaryButton type="button" className="rounded-xl sm:min-w-24">
              Cancel
            </SecondaryButton>
          </AppModal.Dismiss>
          <BaseButton
            type="button"
            variant="default"
            size="default"
            disabled={!selectedUser || isCreatingConversation}
            className="min-w-[6.5rem] rounded-xl shadow-sm"
            onClick={handleStart}
          >
            {isCreatingConversation ? "Creating…" : "Start"}
          </BaseButton>
        </div>
      </AppModal.Content>
    </AppModal.Root>
  )
}
