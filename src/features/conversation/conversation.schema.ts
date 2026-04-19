import { z } from "zod"

export const sendMessageSchema = z.object({
  conversationId: z
    .string({ error: "Conversation id is required" })
    .or(z.number({ error: "Conversation id is required" }))
    .pipe(z.coerce.number()),
  content: z
    .string({ error: "Content is required" })
    .min(1, { error: "Content should have some text" }),
})

export type SendMessagePayload = z.infer<typeof sendMessageSchema>

/** Form-only schema: `conversationId` is merged on submit before `sendMessageSchema` runs. */
export const sendMessageFormSchema = z.object({
  content: sendMessageSchema.shape.content,
})

export type SendMessageFormValues = z.infer<typeof sendMessageFormSchema>
