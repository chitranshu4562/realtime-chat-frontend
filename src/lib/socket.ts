import { io, type Socket } from "socket.io-client";

import env from "@/config/env";

export function createAuthenticatedSocket(token: string): Socket {
  return io(env.baseUrl, {
    transports: ["polling", "websocket"], // first polling means http request that can carry token in headers, and when authenticated then it upgrade to websocket.
    autoConnect: true,
    extraHeaders: {
      token,
    },
  });
}