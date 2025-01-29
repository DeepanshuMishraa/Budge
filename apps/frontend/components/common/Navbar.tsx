'use client'
import Link from "next/link"
import { Button } from "../ui/button"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { ModeToggle } from "./mode-toggle"

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest: any) => {
    const previous = scrollY.getPrevious()
    if (latest > previous! && latest > 100) {
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }
  })

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ type: "spring", damping: 20, stiffness: 200 }}
      className="fixed top-0 left-0 w-full z-50"
    >
      <DesktopNav />
      <MobileNav />
    </motion.div>
  )
}

const DesktopNav = () => {
  return (
    <nav className="max-lg:hidden flex items-center justify-center p-4">
      <div className="flex items-center justify-between px-4 py-3 w-full max-w-xl rounded-xl backdrop-blur-md border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black shadow-sm dark:shadow-gray-800/20">
        <Link
          href="/"
          className="font-semibold text-xl text-gray-800 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white transition-colors"
        >
          Budge
        </Link>
        <div className="flex items-center gap-6">
          <ModeToggle />
          <Link
            href="/login"
            className="text-gray-600 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-200 transition-colors font-medium"
          >
            Login
          </Link>
          <Button
            asChild
            className="rounded-sm bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg transition-all dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 dark:text-white"
          >
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="lg:hidden flex items-center justify-between p-4 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-black">
      <Link
        href="/"
        className="font-bold text-2xl text-gray-800 dark:text-gray-200"
      >
        Budge
      </Link>

      <div className="flex items-center gap-4">
        <ModeToggle />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
        transition={{ duration: 0.2 }}
        className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-800/50 py-4 px-6"
        style={{ display: isOpen ? "block" : "none" }}
      >
        <div className="flex flex-col gap-4">
          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="text-gray-600 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-200 transition-colors py-2"
          >
            Login
          </Link>
          <Button
            asChild
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 dark:text-white"
          >
            <Link href="/signup" onClick={() => setIsOpen(false)}>
              Get Started
            </Link>
          </Button>
        </div>
      </motion.div>
    </nav>
  )
}
