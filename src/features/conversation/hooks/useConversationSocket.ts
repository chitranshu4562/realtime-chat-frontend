import { useCallback, useEffect, useRef } from "react"
import type { Socket } from "socket.io-client"

import { useAuthStore } from "@/features/auth/store/useAuthStore"
import type { SendMessagePayload } from "@/features/conversation/conversation.schema"
import { createAuthenticatedSocket } from "@/lib/socket"
import { notifyError, notifySuccess } from "@/lib/toast"
import type { SocketResponse } from "@/lib/socket-types"
import { queryClient } from "@/lib/queryClient"
import { conversationKeys } from "../conversation.cache"
import type { FetchMessagesResponseData, Message } from "../conversation.types"

function normalizeSocketMessage(data: Record<string, unknown>, loggedInUserId: number): Message {
  const statuses = data.messageStatuses as Array<{ recipientId: number; statusType: string }> | undefined
  const myStatus = statuses?.find((s) => s.recipientId === loggedInUserId) ?? statuses?.[0]
  return {
    id: data.id as number,
    content: data.content as string,
    conversationId: data.conversationId as number,
    senderId: data.senderId as number,
    recipientId: myStatus?.recipientId ?? loggedInUserId,
    status: (myStatus?.statusType ?? "READ") as Message["status"],
    createdAt: data.createdAt as string,
    updatedAt: data.updatedAt as string,
  }
}

function appendMessageToCache(conversationId: number, message: Message) {
  queryClient.setQueryData(
    conversationKeys.messagesList({ conversationId }),
    (old: FetchMessagesResponseData | undefined) => {
      if (!old) return old
      if (old.messages.some((m) => m.id === message.id)) return old
      return { messages: [...old.messages, message] }
    },
  )
}

export function useConversationSocket(conversationId: number) {
  const token = useAuthStore((state) => state.accessToken)
  const loggedInUserId = useAuthStore((state) => state.user?.id)
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    if (!token) return

    const socket: Socket = createAuthenticatedSocket(token)
    socketRef.current = socket

    const handleConnect = () => {
      socket.emit("conversation:join", { conversationId }, (response: SocketResponse) => {
        if (!response.success) {
          notifyError(response.message)
        } else {
          notifySuccess(response.message)
        }
      })
    }

    const handleNewMessage = (response: SocketResponse) => {
      if (response.success && response.data && loggedInUserId !== undefined) {
        const message = normalizeSocketMessage(
          response.data as Record<string, unknown>,
          Number(loggedInUserId),
        )
        appendMessageToCache(conversationId, message)
      }
    }

    const handlePendingMessages = (pendingStatuses: Array<{
      recipientId: number
      statusType: string
      message: Record<string, unknown>
    }>) => {
      if (loggedInUserId === undefined) return
      for (const s of pendingStatuses) {
        const message: Message = {
          id: s.message.id as number,
          content: s.message.content as string,
          conversationId: s.message.conversationId as number,
          senderId: s.message.senderId as number,
          recipientId: s.recipientId,
          status: s.statusType as Message["status"],
          createdAt: s.message.createdAt as string,
          updatedAt: s.message.updatedAt as string,
        }
        appendMessageToCache(conversationId, message)
      }
    }

    socket.on("connect", handleConnect)
    socket.on("message:new", handleNewMessage)
    socket.on("message:pending", handlePendingMessages)

    return () => {
      socket.off("connect", handleConnect)
      socket.off("message:new", handleNewMessage)
      socket.off("message:pending", handlePendingMessages)
      if (socket.connected) {
        socket.emit("conversation:leave", { conversationId })
      }
      socketRef.current = null
      socket.disconnect()
    }
  }, [conversationId, token, loggedInUserId])

  const emitMessageSend = useCallback(
    (payload: SendMessagePayload) => {
      const socket = socketRef.current
      if (!socket) {
        notifyError("Not connected. Sign in and try again.")
        return
      }
      socket.emit("message:send", payload, (response: SocketResponse) => {
        if (response.success) {
          if (response.data && loggedInUserId !== undefined) {
            const message = normalizeSocketMessage(
              response.data as Record<string, unknown>,
              Number(loggedInUserId),
            )
            appendMessageToCache(conversationId, message)
          }
        } else {
          notifyError(response.message)
        }
      })
    },
    [conversationId, loggedInUserId],
  )

  return { emitMessageSend }
}
