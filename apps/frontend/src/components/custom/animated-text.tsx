"use client"

import { motion } from "framer-motion"

export const AnimatedText = () => {
  const text = "Track your spend effortlessly"
  const subtitle = "No matter what your budget is, we can help you manage it."

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <motion.h1
        className="text-4xl md:text-6xl lg:text-7xl font-bold text-center bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {text}
      </motion.h1>

      <motion.p
        className="mt-6 text-lg md:text-xl text-center text-muted-foreground max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {subtitle}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 flex flex-col sm:flex-row gap-4 items-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium"
        >
          Get started for free
        </motion.button>
        <p className="text-sm text-muted-foreground">7 day free trial. No credit card required.</p>
      </motion.div>
    </div>
  )
}

