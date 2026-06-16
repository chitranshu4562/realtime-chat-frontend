import { zodResolver } from "@hookform/resolvers/zod"
import { Send } from "lucide-react"
import { useEffect, useId } from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { notifyError } from "@/lib/toast"

import {
  sendMessageFormSchema,
  sendMessageSchema,
  type SendMessageFormValues,
  type SendMessagePayload,
} from "../conversation.schema"

const INPUT_CLASSES = cn(
  "flex h-10 w-full min-w-0 rounded-lg border border-input bg-background px-3 text-md text-foreground transition-[color,box-shadow] outline-none",
  "placeholder:text-muted-foreground",
  "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
  "disabled:cursor-not-allowed disabled:opacity-50",
)

const INPUT_ERROR_CLASSES =
  "border-destructive ring-[3px] ring-destructive/20 focus-visible:border-destructive focus-visible:ring-destructive/20 dark:border-destructive/50 dark:ring-destructive/40 dark:focus-visible:border-destructive/50 dark:focus-visible:ring-destructive/40"

export type MessageComposerProps = {
  conversationId: number
  onSend: (payload: SendMessagePayload) => void
  disabled?: boolean
}

export function MessageComposer({
  conversationId,
  onSend,
  disabled,
}: MessageComposerProps) {
  const inputId = useId()
  const errorId = `${inputId}-error`

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<SendMessageFormValues>({
    resolver: zodResolver(sendMessageFormSchema),
    defaultValues: { content: "" },
  })

  useEffect(() => {
    reset({ content: "" })
  }, [conversationId, reset])

  function onSubmit(values: SendMessageFormValues) {
    const parsed = sendMessageSchema.safeParse({
      conversationId,
      content: values.content.trim(),
    })

    if (!parsed.success) {
      const first = parsed.error.issues[0]
      notifyError(first?.message ?? "Could not send message.")
      return
    }

    onSend(parsed.data)
    reset({ content: "" })
  }

  const hasError = Boolean(errors.content)
  const isEmpty = watch("content").trim() === ""

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid min-w-0 gap-1.5"
    >
      <div className="flex min-w-0 items-center gap-2">
        <div className="min-w-0 flex-1">
          <label htmlFor={inputId} className="sr-only">
            Message
          </label>
          <input
            id={inputId}
            type="text"
            autoComplete="off"
            placeholder="Type a message…"
            aria-invalid={hasError || undefined}
            aria-describedby={hasError ? errorId : undefined}
            disabled={disabled}
            className={cn(INPUT_CLASSES, hasError && INPUT_ERROR_CLASSES)}
            {...register("content")}
          />
        </div>
        <Button
          type="submit"
          size="icon"
          className="size-10 shrink-0"
          aria-label="Send message"
          disabled={disabled || isEmpty}
        >
          <Send className="size-4" />
        </Button>
      </div>
      {hasError ? (
        <p id={errorId} role="alert" className="text-sm text-destructive">
          {errors.content?.message}
        </p>
      ) : null}
    </form>
  )
}
