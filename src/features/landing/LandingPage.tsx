import { cn } from "@/lib/utils"

import CTASection from "./CTASection.tsx"
import ChatPreview from "./ChatPreview.tsx"
import FeaturesSection from "./FeaturesSection.tsx"
import HeroSection from "./HeroSection.tsx"
import Navbar from "./Navbar.tsx"
import ParticleField from "./ParticleField.tsx"
import styles from "./landing-page.module.css"

export default function LandingPage() {
  return (
    <div className={cn(styles.root, "relative min-h-screen overflow-x-hidden")}>
      <ParticleField />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ChatPreview />
      <CTASection />
    </div>
  )
}
