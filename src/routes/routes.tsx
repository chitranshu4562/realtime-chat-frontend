import { Route, Routes } from "react-router-dom"

import { LoginPage, SignupPage } from "@/features/auth"
import HomePage from "@/features/home/HomePage"
import LandingPage from "@/features/landing/LandingPage"
import NotFoundPage from "@/features/not-found/NotFoundPage"

import { ProtectedRoute, PublicRoute } from "./route-guards"

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      {/* Public auth routes — redirect to /home if already authenticated */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>

      {/* Protected routes — redirect to /login if not authenticated */}
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<HomePage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
