import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "lucide-react";
import { useId } from "react";


export default function CreateExpense() {
  const id = useId();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Expense<PlusIcon /></Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sm:text-center">Create New Expense</DialogTitle>
          <DialogDescription className="sm:text-center">
            Fill in the details for your new expense.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-5">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`${id}-title`}>Title</Label>
              <Input
                id={`${id}-title`}
                placeholder="Grocery shopping"
                type="text"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${id}-amount`}>Amount</Label>
              <Input
                id={`${id}-amount`}
                placeholder="0.00"
                type="number"
                step="0.01"
                min="0"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${id}-tags`}>Tags</Label>
              <Input
                id={`${id}-tags`}
                placeholder="Enter tags separated by commas"
                type="text"
              />
              <p className="text-sm text-muted-foreground">
                Optional: Separate tags with commas (e.g. groceries, food, household)
              </p>
            </div>
          </div>
          <Button type="submit" className="w-full">
            Create Expense
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
