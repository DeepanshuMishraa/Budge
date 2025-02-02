import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { Button } from "../ui/button"
import { BoxIcon, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ModeToggle } from "./mode-toggle"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"

const loginStatus = async () => {
  const res = await axios.get("/api/v1/auth/me");
  if (res.status == 200) {
    return "Logged In"
  } else {
    return "Not Logged In"
  }
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const { data: loginState } = useQuery({
    queryKey: ["loginStatus"],
    queryFn: loginStatus,
  })

  return (
    <nav className="border-b w-full fixed backdrop-blur-lg bg-background/80 z-[100]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-semibold">
              Budge
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <ModeToggle />
            {loginState === "Logged In" ? (
              <a href="/api/v1/auth/logout">
                <Button variant="outline" className="py-3 hover:text-red-500">
                  Logout
                </Button>
              </a>
            ) : (
              <>
                <a href="/api/v1/auth/login">
                  <Button variant="outline" className="py-3 hover:text-red-500">
                    Login
                  </Button>
                </a>
                <a href="/api/v1/auth/register">
                  <Button className="bg-red-500 text-white py-3" variant={null}>
                    <BoxIcon className="mr-2 h-4 w-4" />
                    Get Started for Free
                  </Button>
                </a>
              </>
            )}
          </div>

          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMenu}>
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <div className="w-full text-left py-3">
                <ModeToggle />
              </div>
              {loginState === "Logged In" ? (
                <a href="/api/v1/auth/logout">
                  <Button onClick={async () => {
                    const res = await axios.get("/api/v1/auth/logout");
                    if (res.status == 200) {
                      window.location.href = "/";
                    }
                  }} variant="outline" className="w-full text-left py-3 hover:text-red-500">
                    Logout
                  </Button>
                </a>
              ) : (
                <>
                  <a href="/api/v1/auth/login">
                    <Button variant="outline" className="w-full text-left py-3 hover:text-red-500">
                      Login
                    </Button>
                  </a>
                  <a href="/api/v1/auth/register">
                    <Button className="w-full text-left bg-red-500 text-white py-3" variant={null}>
                      <BoxIcon className="mr-2 h-4 w-4" />
                      Get Started for Free
                    </Button>
                  </a>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar

