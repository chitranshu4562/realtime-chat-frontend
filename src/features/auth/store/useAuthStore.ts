import { create } from "zustand"
import { persist } from "zustand/middleware"

import { AUTH_STORAGE_KEY } from "@/lib/constants"

type AuthState = {
  accessToken: string | null
  setAccessToken: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      setAccessToken: (token) => set({ accessToken: token }),
      logout: () => set({ accessToken: null }),
    }),
    {
      name: AUTH_STORAGE_KEY,
      partialize: (state) => ({ accessToken: state.accessToken }),
    },
  ),
)

/** Pass to `useAuthStore(isAuthenticated)` to subscribe to login state. */
export function isAuthenticated(state: AuthState) {
  return Boolean(state.accessToken)
}
