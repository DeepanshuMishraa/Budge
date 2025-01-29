"use client";
import { OrbitingCircles } from "@/components/ui/orbit-circle";
import { motion } from "framer-motion";
import { CheckIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RetroGrid } from "@/components/ui/retro-grid";

export function IntegrationCard() {
  return (
    <div className="relative mt-10 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background px-4 py-20 md:flex-row md:gap-12 md:px-8">

      <div className="absolute inset-0 bg-radial-gradient from-blue-500/20 to-transparent opacity-30" />

      <div className="relative flex h-[400px] w-full items-center justify-center md:w-1/2">
        <OrbitingCircles
          className="h-[200px] w-[200px]"
          duration={20}
          radius={80}
        >
          <Icons.bank />
          <Icons.upi />
        </OrbitingCircles>
        <OrbitingCircles
          className="h-[300px] w-[300px]"
          duration={25}
          radius={120}
          reverse
        >
          <Icons.creditCard />
          <Icons.rupee />
          <Icons.wallet />
        </OrbitingCircles>

        <OrbitingCircles
          className="h-[400px] w-[400px]"
          duration={30}
          radius={180}
        >
          <Icons.analytics />
          <Icons.insurance />
          <Icons.investment />
        </OrbitingCircles>
      </div>

      <div className="relative z-10 w-full space-y-8 md:w-1/2">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Financial Ecosystem
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Fully Integrated
            </span>
          </h2>

          <p className="mt-6 text-xl text-muted-foreground md:text-2xl">
            Seamless connectivity with banks, UPI services, and financial platforms
          </p>

          <div className="mt-8 space-y-4">
            {[
              "Real-time bank account synchronization",
              "Instant UPI payment integration",
              "AI-powered spending analysis",
              "Multi-bank transaction aggregation"
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckIcon className="h-6 w-6 text-green-500" />
                <span className="text-lg font-medium">{feature}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-4">
            <Button size="lg" className="group h-14 rounded-xl px-8 text-lg">
              Connect Your Bank
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.div>
      </div>

      <RetroGrid />
    </div>
  );
}

const Icons = {
  bank: () => (
    <svg width="100" height="100" viewBox="0 0 24 24" fill="none">
      <path d="M21 9V21H19V9H17V21H7V9H5V21H3V9H1V7H23V9H21Z" fill="currentColor" />
      <path d="M12 0L23 7H1L12 0ZM12 4.158L8.625 6.5H15.375L12 4.158Z" fill="currentColor" />
    </svg>
  ),
  upi: () => (
    <svg width="100" height="100" viewBox="0 0 24 24" fill="none">
      <path d="M8.351 11.352L12 7.704L15.649 11.352L16.351 10.648L12 6.296L7.649 10.648L8.351 11.352Z" fill="currentColor" />
      <path d="M16.351 13.648L15.649 12.948L12 16.596L8.351 12.948L7.649 13.648L12 18L16.351 13.648Z" fill="currentColor" />
      <path d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C16.418 20 20 16.418 20 12C20 7.582 16.418 4 12 4C7.582 4 4 7.582 4 12C4 16.418 7.582 20 12 20Z" fill="currentColor" />
    </svg>
  ),
  creditCard: () => (
    <svg width="100" height="100" viewBox="0 0 24 24" fill="none">
      <path d="M20 4H4C2.897 4 2 4.897 2 6V18C2 19.103 2.897 20 4 20H20C21.103 20 22 19.103 22 18V6C22 4.897 21.103 4 20 4ZM4 6H20V8H4V6ZM4 18V12H20V18H4Z" fill="currentColor" />
      <path d="M8 14H4V16H8V14Z" fill="currentColor" />
    </svg>
  ),
  rupee: () => (
    <svg width="100" height="100" viewBox="0 0 24 24" fill="none">
      <path d="M13.669 13.962C15.379 13.759 16.5 12.588 16.5 10.802H14.7C14.7 11.907 13.794 12.418 12.048 12.618V7.726H14.358V5H12.048V2H9.138V5H6V7.726H9.138V14.421C8.365 14.948 7.8 15.752 7.8 16.883C7.8 18.6 9.182 20 11.1 20C12.331 20 13.329 19.337 13.872 18.468L15.6 19.738C14.785 21.146 13.083 22 11.1 22C8.295 22 6 19.685 6 16.883C6 14.876 7.254 13.204 9.138 12.369V9.543H6V7.726H9.138V5.814H6V3H9.138V5.814H12.048V14.084C13.863 14.284 15 15.055 15 16.2H16.8C16.8 14.273 15.261 12.7 12.048 12.4V14.523C14.034 14.723 15.3 15.853 15.3 17.6C15.3 19.507 13.752 21 11.7 21C10.296 21 9.15 20.165 8.55 19H6.3C7.056 21.22 9.3 22.8 11.7 22.8C14.916 22.8 17.4 20.304 17.4 17.1C17.4 15.138 16.335 13.473 14.637 12.641L13.669 13.962Z" fill="currentColor" />
    </svg>
  ),
  wallet: () => (
    <svg width="100" height="100" viewBox="0 0 24 24" fill="none">
      <path d="M19 7H5C3.346 7 2 8.346 2 10V18C2 19.654 3.346 21 5 21H19C20.654 21 22 19.654 22 18V10C22 8.346 20.654 7 19 7ZM5 9H19C19.552 9 20 9.449 20 10V11H4V10C4 9.449 4.448 9 5 9ZM19 19H5C4.448 19 4 18.551 4 18V13H20V18C20 18.551 19.552 19 19 19Z" fill="currentColor" />
      <path d="M16 15.5C16.828 15.5 17.5 16.172 17.5 17C17.5 17.828 16.828 18.5 16 18.5C15.172 18.5 14.5 17.828 14.5 17C14.5 16.172 15.172 15.5 16 15.5Z" fill="currentColor" />
    </svg>
  ),
  analytics: () => (
    <svg width="100" height="100" viewBox="0 0 24 24" fill="none">
      <path d="M5 3H19C20.103 3 21 3.897 21 5V19C21 20.103 20.103 21 19 21H5C3.897 21 3 20.103 3 19V5C3 3.897 3.897 3 5 3ZM7 13V17H9V13H7ZM11 7V17H13V7H11ZM15 11V17H17V11H15Z" fill="currentColor" />
    </svg>
  ),
  insurance: () => (
    <svg width="100" height="100" viewBox="0 0 24 24" fill="none">
      <path d="M12 1L21 5V11C21 16.55 17.16 21.74 12 23C6.84 21.74 3 16.55 3 11V5L12 1ZM12 3.311L5 6.849V11C5 15.52 8.25 20.1 12 21.32C15.75 20.1 19 15.52 19 11V6.849L12 3.311ZM12 16C14.761 16 17 13.761 17 11H15C15 12.657 13.657 14 12 14C10.343 14 9 12.657 9 11H7C7 13.761 9.239 16 12 16Z" fill="currentColor" />
    </svg>
  ),
  investment: () => (
    <svg width="100" height="100" viewBox="0 0 24 24" fill="none">
      <path d="M9.5 3L5.5 7L7 8.5L8.5 7H11V3H9.5ZM14.5 3H13V7H15.5L17 8.5L18.5 7L14.5 3ZM8.5 17L7 15.5L5.5 17L9.5 21H11V17H8.5ZM15.5 17H13V21H14.5L18.5 17L17 15.5L15.5 17ZM20 10H4V14H20V10Z" fill="currentColor" />
    </svg>
  )
};
