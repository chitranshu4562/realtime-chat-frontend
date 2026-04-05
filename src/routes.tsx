import { Route, Routes } from "react-router-dom"

import { LoginPage, SignupPage } from "@/features/auth"
import LandingPage from "@/features/landing/LandingPage"
import NotFoundPage from "@/features/not-found/NotFoundPage"

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
