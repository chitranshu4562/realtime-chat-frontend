import { motion } from "framer-motion"

const bubbles = [
  { text: "Hey! 👋", x: "10%", y: "20%", delay: 0, size: "md" },
  { text: "What's up?", x: "75%", y: "15%", delay: 0.5, size: "lg" },
  { text: "🔥🔥🔥", x: "85%", y: "60%", delay: 1, size: "sm" },
  { text: "Let's chat!", x: "5%", y: "65%", delay: 1.5, size: "md" },
  { text: "😍", x: "60%", y: "75%", delay: 2, size: "sm" },
  { text: "Miss you!", x: "30%", y: "80%", delay: 0.8, size: "md" },
  { text: "On my way 🚀", x: "90%", y: "35%", delay: 1.2, size: "lg" },
]

const emojiBubbles = [
  { emoji: "😊", x: "15%", y: "30%", delay: 0.3, duration: 6 },
  { emoji: "🥰", x: "80%", y: "25%", delay: 1.0, duration: 7 },
  { emoji: "😂", x: "45%", y: "70%", delay: 0.7, duration: 5 },
  { emoji: "🤩", x: "70%", y: "50%", delay: 1.8, duration: 8 },
  { emoji: "💬", x: "25%", y: "55%", delay: 2.2, duration: 6 },
  { emoji: "❤️", x: "55%", y: "20%", delay: 0.5, duration: 7 },
  { emoji: "✨", x: "92%", y: "45%", delay: 1.5, duration: 5 },
  { emoji: "🎉", x: "8%", y: "75%", delay: 2.0, duration: 6 },
]

const sizeClasses = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
}

export default function FloatingBubbles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {bubbles.map((bubble, i) => (
        <motion.div
          key={`msg-${i}`}
          className={`absolute ${sizeClasses[bubble.size as keyof typeof sizeClasses]}`}
          style={{ left: bubble.x, top: bubble.y }}
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{
            opacity: [0, 0.85, 0.85, 0],
            scale: [0, 1, 1, 0.8],
            y: [20, 0, -10, -30],
          }}
          transition={{
            duration: 5,
            delay: bubble.delay,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
        >
          <div className="relative rounded-2xl rounded-bl-sm border border-primary/20 bg-gradient-to-br from-primary/80 to-secondary/60 px-4 py-2 text-primary-foreground shadow-lg backdrop-blur-sm">
            {bubble.text}
            <div
              className="absolute -bottom-1.5 left-1 h-3 w-3 rounded-br-full bg-gradient-to-br from-primary/80 to-secondary/60"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
            />
          </div>
        </motion.div>
      ))}

      {emojiBubbles.map((eb, i) => (
        <motion.div
          key={`emoji-${i}`}
          className="absolute text-2xl sm:text-3xl"
          style={{ left: eb.x, top: eb.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.9, 0.9, 0],
            scale: [0.3, 1.2, 1, 0.5],
            y: [0, -20, -40, -80],
            rotate: [0, 10, -10, 20],
          }}
          transition={{
            duration: eb.duration,
            delay: eb.delay,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "easeInOut",
          }}
        >
          {eb.emoji}
        </motion.div>
      ))}

      {[0, 1, 2].map((i) => (
        <motion.div
          key={`orbit-${i}`}
          className="absolute h-2 w-2 rounded-full bg-accent/50"
          style={{
            left: "50%",
            top: "50%",
          }}
          animate={{
            x: [
              Math.cos((i * 2 * Math.PI) / 3) * 200,
              Math.cos((i * 2 * Math.PI) / 3 + Math.PI) * 200,
              Math.cos((i * 2 * Math.PI) / 3 + 2 * Math.PI) * 200,
            ],
            y: [
              Math.sin((i * 2 * Math.PI) / 3) * 150,
              Math.sin((i * 2 * Math.PI) / 3 + Math.PI) * 150,
              Math.sin((i * 2 * Math.PI) / 3 + 2 * Math.PI) * 150,
            ],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 12,
            delay: i * 0.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {[
        { x: "20%", y: "40%", color: "bg-primary/40" },
        { x: "70%", y: "30%", color: "bg-secondary/40" },
        { x: "50%", y: "60%", color: "bg-accent/40" },
        { x: "85%", y: "70%", color: "bg-primary/30" },
      ].map((dot, i) => (
        <motion.div
          key={`glow-${i}`}
          className={`absolute h-3 w-3 rounded-full ${dot.color} blur-[2px]`}
          style={{ left: dot.x, top: dot.y }}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3,
            delay: i * 0.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
