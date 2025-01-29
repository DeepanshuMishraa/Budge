"use client";

import { RetroGrid } from "@/components/ui/retro-grid";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background px-4 md:shadow-xl">
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6 inline-block rounded-full border px-4 py-2 text-sm backdrop-blur-sm">
            🚀 Next-gen Financial Management
          </div>
          <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Track Smarter,
            </span>
            <br />
            <span className="mt-2 inline-block">Spend Wisely</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground md:text-2xl">
            AI-powered expense tracking that learns your habits,
            predicts your spending, and grows your savings.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" className="group rounded-xl px-8 py-6 text-lg">
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.div>
        <div className="relative mt-16">
          <motion.div
            className="absolute -left-20 top-8 hidden rounded-2xl border bg-card/80 p-4 backdrop-blur-md md:block"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-green-500/10 p-2">
                💸
              </div>
              <div>
                <p className="font-semibold">AI Classification</p>
                <p className="text-sm text-muted-foreground">Smart Expense Sorting</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute -right-20 top-8 hidden rounded-2xl border bg-card/80 p-4 backdrop-blur-md md:block"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-blue-500/10 p-2">
                📊
              </div>
              <div>
                <p className="font-semibold">Real-Time Analytics</p>
                <p className="text-sm text-muted-foreground">Instant Spending Insights</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 opacity-50">
        <RetroGrid />
      </div>
    </div>
  );
}
