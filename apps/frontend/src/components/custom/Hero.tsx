import { motion } from "framer-motion"
import { Mockup, MockupFrame } from "./mockup"
import Glow from "../glow"
import { useTheme } from "../theme-provider"
const Hero = () => {
  const text = "Track your spend effortlessly"
  const subtitle = "No matter what your budget is, we can help you manage it."

  const { theme } = useTheme();
  let src;

  switch (theme) {
    case "light":
      src = "https://phh5ur14gr.ufs.sh/f/a1wYTWuoYzdPrpTlFA48xYrjE4LDvt6NO2fiTb9sKG3eCgka";
      break;
    case "dark":
      src = "https://phh5ur14gr.ufs.sh/f/a1wYTWuoYzdPUnRCJhKnWDepcJ65t3iHKQEqS9ON8vgPmhwC";
      break;
    default:
      src = "https://phh5ur14gr.ufs.sh/f/a1wYTWuoYzdPrpTlFA48xYrjE4LDvt6NO2fiTb9sKG3eCgka";
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 pt-24 overflow-hidden relative z-0">
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
        className="mt-8 flex flex-col gap-4 items-center relative z-10"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium relative"
        >
          Get started for free
        </motion.button>
        <p className="text-sm text-muted-foreground">7 day free trial. No credit card required.</p>
      </motion.div>
      <div className="relative mt-20 w-full max-w-full">
        <MockupFrame
          className="animate-appear opacity-0 delay-700 max-w-full"
          size="small"
        >
          <Mockup type="responsive">
            <img
              src={src}
              alt="Reflexware"
              width={1248}
              height={765}
              className="max-w-full h-auto"
            />
          </Mockup>
        </MockupFrame>
        <Glow
          variant="top"
          className="animate-appear-zoom opacity-0 delay-1000"
        />
      </div>
    </div >
  )
}


export default Hero
