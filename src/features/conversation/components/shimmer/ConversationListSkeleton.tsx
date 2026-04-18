import { cn } from "@/lib/utils"

import { ShimmerBar } from "./ShimmerBar"

const SKELETON_ROW_COUNT = 6

function ConversationRowSkeleton() {
  return (
    <div
      className={cn(
        "flex w-full items-center gap-3 rounded-xl border border-border bg-card/40 p-3.5",
        "pointer-events-none",
      )}
      aria-hidden
    >
      <ShimmerBar className="size-11 shrink-0 rounded-full" />
      <span className="min-w-0 flex-1 space-y-2 py-0.5">
        <ShimmerBar className="h-4 w-[48%] max-w-[10rem]" />
        <ShimmerBar className="h-3 w-[72%] max-w-[14rem]" />
      </span>
    </div>
  )
}

export function ConversationListSkeleton() {
  return (
    <div className="flex flex-col gap-2" aria-busy="true" aria-label="Loading conversations">
      {Array.from({ length: SKELETON_ROW_COUNT }, (_, i) => (
        <ConversationRowSkeleton key={i} />
      ))}
    </div>
  )
}
