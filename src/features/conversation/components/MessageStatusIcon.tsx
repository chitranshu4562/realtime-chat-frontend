import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import type { MessageStatus } from "../conversation.types"

type MessageStatusIconProps = {
  status: MessageStatus
}

export function MessageStatusIcon({ status }: MessageStatusIconProps) {
  if (status === "PENDING") {
    return <Check size={13} className="text-primary/60" strokeWidth={2.5} />
  }

  const color = status === "READ" ? "text-blue-500" : "text-primary/60"

  return (
    <span className={cn("relative inline-flex", color)}>
      <Check size={13} strokeWidth={2.5} className="relative z-10" />
      <Check size={13} strokeWidth={2.5} className="absolute left-[5px]" />
    </span>
  )
}
