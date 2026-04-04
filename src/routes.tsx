import { Route, Routes } from "react-router-dom"

import LandingPage from "@/features/landing/LandingPage"
import LoginPage from "@/features/login/LoginPage"
import NotFoundPage from "@/features/not-found/NotFoundPage"
import SignupPage from "@/features/signup/SignupPage"

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
