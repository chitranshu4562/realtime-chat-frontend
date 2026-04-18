import { cn } from "@/lib/utils"

import { ShimmerBar } from "./ShimmerBar"

const SKELETON_ROW_COUNT = 6

const skeletonRowClass = cn(
  "flex w-full items-center gap-3 rounded-xl border border-border bg-card/40 p-3.5 text-left",
  "pointer-events-none cursor-default",
)

function MemberUserCardSkeleton() {
  return (
    <div className={cn(skeletonRowClass)} aria-hidden>
      <ShimmerBar className="size-11 shrink-0 rounded-full" />
      <span className="min-w-0 flex-1 space-y-2 py-0.5">
        <ShimmerBar className="h-4 w-[42%] max-w-[10rem]" />
        <ShimmerBar className="h-3 w-[68%] max-w-[14rem]" />
      </span>
      <span className="size-8 shrink-0 rounded-full bg-muted/80" />
    </div>
  )
}

export function MembersListSkeleton() {
  return (
    <div className="flex flex-col gap-2" aria-busy="true" aria-label="Loading members">
      {Array.from({ length: SKELETON_ROW_COUNT }, (_, i) => (
        <MemberUserCardSkeleton key={i} />
      ))}
    </div>
  )
}
