import * as React from "react"
import { AlertCircle, Check, MessageCircle, Users } from "lucide-react"

import { AppModal } from "@/components/ui/app-modal"
import { BaseButton } from "@/components/ui/base-button"
import { SecondaryButton } from "@/components/ui/secondary-button"
import { useCreateConversation } from "@/features/conversation/hooks/useCreateConversation"
import { useFetchUserList } from "@/features/user/hooks/useFetchUserList"
import type { User } from "@/features/user/user.types"
import { notifyError } from "@/lib/toast"
import { cn } from "@/lib/utils"

import { MembersListSkeleton } from "./shimmer/MembersListSkeleton"

type Mode = "direct" | "group"

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

type MembersListErrorProps = {
  error: unknown
  onRetry: () => void
}

function MembersListError({ error, onRetry }: MembersListErrorProps) {
  const message =
    error instanceof Error ? error.message : "Something went wrong."

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-destructive/25 bg-destructive/5 px-4 py-8 text-center">
      <AlertCircle className="size-10 text-destructive" strokeWidth={2} aria-hidden />
      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">Could not load members</p>
        <p className="text-xs text-muted-foreground">{message}</p>
      </div>
      <SecondaryButton type="button" className="rounded-xl" onClick={() => void onRetry()}>
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

const INPUT_CLASSES = cn(
  "flex h-10 w-full min-w-0 rounded-lg border border-input bg-background px-3 text-sm text-foreground transition-[color,box-shadow] outline-none",
  "placeholder:text-muted-foreground",
  "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
)

export type MembersDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onStartChat?: (user: User) => void
}

export function MembersDialog({ open, onOpenChange, onStartChat }: MembersDialogProps) {
  const [mode, setMode] = React.useState<Mode>("direct")
  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set())
  const [groupName, setGroupName] = React.useState("")

  const { data, isPending, isError, error, refetch } = useFetchUserList({}, { enabled: open })
  const { mutate: runCreateConversation, isPending: isCreatingConversation } = useCreateConversation()

  // reset all state when dialog closes
  React.useEffect(() => {
    if (!open) {
      setMode("direct")
      setSelectedId(null)
      setSelectedIds(new Set())
      setGroupName("")
    }
  }, [open])

  const users = data?.users ?? []

  function toggleGroupMember(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function handleStart() {
    if (mode === "direct") {
      if (!selectedId) return
      const user = users.find((u) => u.id === selectedId)
      const memberId = Number.parseInt(selectedId, 10)
      if (!Number.isFinite(memberId)) {
        notifyError("Could not start chat for this member. Please try again.")
        return
      }
      runCreateConversation(
        { type: "DIRECT", memberIds: [memberId] },
        {
          onSuccess: () => {
            if (user) onStartChat?.(user)
            onOpenChange(false)
          },
        },
      )
    } else {
      const trimmedName = groupName.trim()
      if (!trimmedName) {
        notifyError("Please enter a group name.")
        return
      }
      if (selectedIds.size < 2) {
        notifyError("Select at least 2 members for a group.")
        return
      }
      const memberIds = [...selectedIds].map((id) => Number.parseInt(id, 10))
      runCreateConversation(
        { type: "GROUP", name: trimmedName, memberIds },
        { onSuccess: () => onOpenChange(false) },
      )
    }
  }

  const canStart =
    mode === "direct"
      ? selectedId !== null
      : groupName.trim().length > 0 && selectedIds.size >= 2

  const buttonLabel = isCreatingConversation
    ? mode === "direct" ? "Starting…" : "Creating…"
    : mode === "direct" ? "Start" : "Create group"

  return (
    <AppModal.Root variant="dialog" open={open} onOpenChange={onOpenChange}>
      <AppModal.Overlay />
      <AppModal.Content
        className="flex max-h-[min(92vh,48rem)] min-h-[min(58vh,28rem)] w-[calc(100%-2rem)] max-w-lg flex-col p-0 sm:p-0"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {/* header */}
        <div className="shrink-0 border-b border-border/80 bg-gradient-to-br from-primary/[0.07] via-transparent to-transparent px-4 py-3 sm:px-5">
          <div className="flex items-start gap-2.5">
            <div
              className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/20"
              aria-hidden
            >
              <Users className="size-[1.125rem]" strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1">
              <AppModal.Title className="text-base font-semibold sm:text-lg">
                New conversation
              </AppModal.Title>
              <AppModal.Description className="mt-0.5 text-xs leading-snug sm:text-sm">
                Start a direct message or create a group.
              </AppModal.Description>
            </div>
          </div>

          {/* mode toggle */}
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => setMode("direct")}
              className={cn(
                "flex-1 rounded-lg border py-1.5 text-xs font-medium transition-colors",
                mode === "direct"
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-border bg-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              Direct message
            </button>
            <button
              type="button"
              onClick={() => setMode("group")}
              className={cn(
                "flex-1 rounded-lg border py-1.5 text-xs font-medium transition-colors",
                mode === "group"
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-border bg-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              New group
            </button>
          </div>
        </div>

        {/* group name input */}
        {mode === "group" && (
          <div className="shrink-0 border-b border-border/60 px-4 py-3 sm:px-5">
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Group name
            </label>
            <input
              type="text"
              placeholder="Enter group name…"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              maxLength={80}
              className={INPUT_CLASSES}
              autoComplete="off"
            />
          </div>
        )}

        {/* member list */}
        <div
          className="min-h-0 flex-1 overflow-y-auto px-4 py-3 sm:px-5"
          role="listbox"
          aria-label="Team members"
          aria-multiselectable={mode === "group"}
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
              {mode === "group" && selectedIds.size > 0 && (
                <p className="mb-1 text-xs text-muted-foreground">
                  {selectedIds.size} member{selectedIds.size !== 1 ? "s" : ""} selected
                  {selectedIds.size < 2 ? " — select at least 2" : ""}
                </p>
              )}
              {users.map((user) =>
                mode === "direct" ? (
                  <MemberUserCard
                    key={user.id}
                    user={user}
                    selected={user.id === selectedId}
                    onSelect={() => setSelectedId(user.id)}
                  />
                ) : (
                  <MemberUserCard
                    key={user.id}
                    user={user}
                    selected={selectedIds.has(user.id)}
                    onSelect={() => toggleGroupMember(user.id)}
                  />
                ),
              )}
            </div>
          ) : null}
        </div>

        {/* footer */}
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
            disabled={!canStart || isCreatingConversation}
            className="min-w-[7rem] rounded-xl shadow-sm"
            onClick={handleStart}
          >
            {buttonLabel}
          </BaseButton>
        </div>
      </AppModal.Content>
    </AppModal.Root>
  )
}
