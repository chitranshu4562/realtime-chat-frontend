import { useCallback, useEffect, useRef } from "react"
import type { Socket } from "socket.io-client"

import { useAuthStore } from "@/features/auth/store/useAuthStore"
import type { SendMessagePayload } from "@/features/conversation/conversation.schema"
import { createAuthenticatedSocket } from "@/lib/socket"
import { notifyError, notifySuccess } from "@/lib/toast"
import type { SocketResponse } from "@/lib/socket-types"

export function useConversationSocket(conversationId: number) {
  const token = useAuthStore((state) => state.accessToken)
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

    socket.on("connect", handleConnect)

    return () => {
      socket.off("connect", handleConnect)
      if (socket.connected) {
        socket.emit("conversation:leave", { conversationId })
      }
      socketRef.current = null
      socket.disconnect()
    }
  }, [conversationId, token])

  const emitMessageSend = useCallback((payload: SendMessagePayload) => {
    const socket = socketRef.current
    if (!socket) {
      notifyError("Not connected. Sign in and try again.")
      return
    }
    socket.emit("message:send", payload, (response: SocketResponse) => {
      if (response.success) {
        notifySuccess(response.message)
      } else {
        notifyError(response.message)
      }
    })
  }, [])

  return { emitMessageSend }
}
