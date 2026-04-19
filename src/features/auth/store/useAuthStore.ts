import { create } from "zustand"
import { persist } from "zustand/middleware"

import { AUTH_STORAGE_KEY } from "@/lib/constants"

import type { User } from "../auth.types"

type AuthState = {
  accessToken: string | null
  user: User | null
  setAuth: (payload: { accessToken: string; user: User }) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      setAuth: ({ accessToken, user }) => set({ accessToken, user }),
      logout: () => set({ accessToken: null, user: null }),
    }),
    {
      name: AUTH_STORAGE_KEY,
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
      }),
    },
  ),
)

/** Pass to `useAuthStore(isAuthenticated)` to subscribe to login state. */
export function isAuthenticated(state: AuthState) {
  return Boolean(state.accessToken)
}
