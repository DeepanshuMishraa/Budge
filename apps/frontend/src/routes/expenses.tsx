import CreateExpense from '@/components/CreateExpense'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'

export const Route = createFileRoute('/expenses')({
  component: ExpenseComponent,
})

interface Expense {
  title: string;
  amount: number;
  tags: string;
}

async function getExpenses() {
  const res = await axios.get<Expense>("/api/v1/expenses");
  return res.data;
}

function ExpenseComponent() {
  const query = useQuery({
    queryKey: ['expenses'],
    queryFn: getExpenses,
  })

  const { data, error, isLoading } = query;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-2">
        <div className="text-destructive text-xl">Error loading expenses</div>
        <p className="text-muted-foreground">{(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-10 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
        <div className="space-y-2 mb-6 md:mb-0">
          <h1 className="text-4xl font-bold tracking-tight">Expenses</h1>
          <p className="text-muted-foreground">Keep track of your spending habits</p>
        </div>
        <CreateExpense />
      </div>

      {/* Content Section */}
      {!data ? (
        <div className="flex flex-col items-center justify-center py-16 bg-muted/30 rounded-lg">
          <p className="text-xl font-semibold mb-2">No expense found</p>
          <p className="text-muted-foreground">Create your first expense to get started</p>
        </div>
      ) : (
        <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="flex justify-between items-start">
              <span className="font-semibold">{data.title}</span>
              <span className="text-xl font-bold text-primary">
                ${data.amount.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-sm bg-secondary text-secondary-foreground">
                {data.tags}
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
