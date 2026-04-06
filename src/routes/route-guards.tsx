import { Navigate, Outlet } from "react-router-dom"

import { isAuthenticated, useAuthStore } from "@/features/auth/store/useAuthStore"

/** Layout for protected segments — renders child routes or redirects to `/login`. */
export function ProtectedRoute() {
  const signedIn = useAuthStore(isAuthenticated)
  if (!signedIn) {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}

/** Layout for guest-only auth pages — renders child routes or redirects to `/home`. */
export function PublicRoute() {
  const signedIn = useAuthStore(isAuthenticated)
  if (signedIn) {
    return <Navigate to="/home" replace />
  }
  return <Outlet />
}
