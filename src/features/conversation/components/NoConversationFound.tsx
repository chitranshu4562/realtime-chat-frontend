import { MessageCircle, Sparkles } from "lucide-react"

import { BaseButton } from "@/components/ui/base-button"
import { cn } from "@/lib/utils"

export type NoConversationFoundProps = {
  /** Called when the user taps “Start new chat”. Wire when new-chat flow exists. */
  onStartNewChat?: () => void
  className?: string
}

export function NoConversationFound({
  onStartNewChat,
  className,
}: NoConversationFoundProps) {
  return (
    <section
      role="status"
      aria-live="polite"
      className={cn(
        "flex w-full max-w-md flex-col items-center text-center",
        "animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-500",
        className,
      )}
    >
      <div className="relative mb-8">
        <div
          className="pointer-events-none absolute inset-0 -z-10 animate-[pulse_4s_ease-in-out_infinite] rounded-full bg-primary/8 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute -inset-6 animate-[pulse_2.5s_ease-in-out_infinite] rounded-full bg-primary/10 blur-2xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 -z-10 rounded-2xl ring-2 ring-primary/20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"
          aria-hidden
        />
        <div
          className={cn(
            "relative flex size-24 items-center justify-center rounded-2xl",
            "bg-primary/12 text-primary ring-1 ring-primary/20",
            "shadow-[0_0_0_1px_hsl(var(--color-border-default)/0.35)]",
            "transition-transform duration-300 ease-out hover:scale-105",
            "animate-[bounce_3.5s_ease-in-out_infinite]",
          )}
        >
          <MessageCircle
            className="size-11 animate-[pulse_1.8s_ease-in-out_infinite]"
            strokeWidth={2}
            aria-hidden
          />
        </div>
        <span
          className="absolute -right-1 -bottom-1 flex size-9 items-center justify-center rounded-xl bg-card text-amber-500 shadow-md ring-1 ring-border animate-[bounce_2.8s_ease-in-out_infinite]"
          aria-hidden
        >
          <Sparkles
            className="size-4 animate-[spin_8s_linear_infinite]"
            strokeWidth={2}
          />
        </span>
      </div>

      <h1 className="text-2xl font-semibold tracking-tight text-foreground">
        No conversation yet
      </h1>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
        Start a new chat to connect with others in real time. Your messages will
        appear here.
      </p>

      <BaseButton
        type="button"
        variant="default"
        size="lg"
        className="mt-8 min-w-[12rem] rounded-xl shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-md animate-[pulse_2.2s_ease-in-out_infinite]"
        onClick={() => onStartNewChat?.()}
      >
        Start new chat
      </BaseButton>
    </section>
  )
}
