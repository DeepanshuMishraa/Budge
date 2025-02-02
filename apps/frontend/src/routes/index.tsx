import BentoGrid from '@/components/custom/bento'
import Hero from '@/components/custom/Hero'
import { createFileRoute } from '@tanstack/react-router'
import {
  BrainCircuit,
  Building2,
  CreditCard,
  LineChart,
  PiggyBank,
  Receipt,
  Share2
} from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Landing,
})

function Landing() {
  const expenseTrackerFeatures = [
    {
      title: "Smart Bank Integration",
      meta: "Real-time",
      description: "Seamlessly connect with 10,000+ banks worldwide. Automatic transaction syncing and categorization.",
      icon: <Building2 className="w-4 h-4 text-emerald-500" />,
      status: "Live",
      tags: ["Banking", "Sync", "Auto"],
      colSpan: 2,
      hasPersistentHover: true,
    },
    {
      title: "AI Insights",
      meta: "Powered by GPT-4",
      description: "Get personalized financial advice and spending patterns analysis using advanced AI.",
      icon: <BrainCircuit className="w-4 h-4 text-purple-500" />,
      status: "Premium",
      tags: ["AI", "Analytics"],
    },
    {
      title: "Expense Analytics",
      meta: "Pro Feature",
      description: "Beautiful visualizations and detailed breakdowns of your spending habits.",
      icon: <LineChart className="w-4 h-4 text-blue-500" />,
      tags: ["Charts", "Reports"],
      colSpan: 2,
    },
    {
      title: "Smart Receipts",
      meta: "OCR enabled",
      description: "Snap photos of receipts for automatic expense entry and categorization.",
      icon: <Receipt className="w-4 h-4 text-orange-500" />,
      status: "New",
      tags: ["OCR", "Auto"],
    },
  ];

  return (
    <>
      <Hero />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 mb-4">
            Supercharge Your Finance Game
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience the next generation of expense tracking with AI-powered insights,
            real-time bank integrations, and intelligent automation.
          </p>
        </div>
        <BentoGrid items={expenseTrackerFeatures} />
      </div>
    </>
  )
}
