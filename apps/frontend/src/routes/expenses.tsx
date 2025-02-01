import CreateExpense from '@/components/CreateExpense'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/expenses')({
  component: ExpenseComponent,
})

function ExpenseComponent() {
  return (
    <div className='p-4 mt-10 flex justify-between items-center'>
      <div className='space-y-3'>
        <h1 className='text-3xl font-bold'>Expenses</h1>
        <p className='text-gray-500'>Track your expenses</p>
      </div>
      <div>
        <CreateExpense />
      </div>
    </div>
  )
}
