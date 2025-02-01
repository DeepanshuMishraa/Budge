import { motion } from "framer-motion"
const Hero = () => {
  const text = "Track your spend effortlessly"
  const subtitle = "No matter what your budget is, we can help you manage it."

  return (
    <div className="flex flex-col items-center justify-center max-lg:h-[64vh] h-screen px-4">
      <motion.h1
        className="text-4xl md:text-6xl lg:text-7xl font-bold text-center bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text py-4 text-transparent  leading-[3rem] "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Track your spend effortlessly and manage your<br /> budget with ease
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
        className="mt-8 flex flex-col gap-4 items-center"
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


export default Hero
