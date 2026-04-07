import { Route, Routes } from "react-router-dom"

import { LoginPage, SignupPage } from "@/features/auth"
import ConversationPage from "@/features/conversation/ConversationPage"
import LandingPage from "@/features/landing/LandingPage"
import NotFoundPage from "@/features/not-found/NotFoundPage"

import { ProtectedRoute, PublicRoute } from "./route-guards"

export function AppRoutes() {
  return (
    <Routes>

      {/* Public auth routes — redirect to /conversation if already authenticated */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>

      {/* Protected routes — redirect to /login if not authenticated */}
      <Route element={<ProtectedRoute />}>

        <Route path="/conversation" element={<ConversationPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
