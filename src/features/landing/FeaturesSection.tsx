import { motion } from "framer-motion"
import { Lock, Sparkles, Users, Zap } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Instant Delivery",
    desc: "Messages arrive in under 50ms. Feel the difference.",
    color: "text-primary",
  },
  {
    icon: Users,
    title: "Group Chats",
    desc: "Create rooms for teams, friends, or communities.",
    color: "text-primary",
  },
  {
    icon: Lock,
    title: "Privacy First",
    desc: "No ads, no tracking, no data selling. Ever.",
    color: "text-accent",
  },
  {
    icon: Sparkles,
    title: "Smart Features",
    desc: "AI-powered replies, reactions, and smart search.",
    color: "text-secondary",
  },
]

export default function FeaturesSection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-heading mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            Why <span className="text-gradient">RealtimeChat</span>?
          </h2>
          <p className="text-muted-foreground mx-auto max-w-xl text-lg">
            Built for speed, designed for humans.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="glass group cursor-default rounded-2xl p-6 sm:p-8"
            >
              <div className="bg-muted group-hover:glow mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-shadow">
                <f.icon className={`h-6 w-6 ${f.color}`} />
              </div>
              <h3 className="font-heading text-foreground mb-2 text-xl font-semibold">
                {f.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
