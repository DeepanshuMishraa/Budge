import { createRootRoute, Outlet } from "@tanstack/react-router"
import Navbar from "../components/custom/Navbar"
import { Toaster } from "@/components/ui/sonner"

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Toaster />
        <Outlet />
      </main>
    </>
  ),
})

