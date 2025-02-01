import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createExpenseSchema as formSchema } from "@budge/common/schema"
import axios from "axios";
import { toast } from "sonner"
import { useNavigate } from "@tanstack/react-router";


export default function CreateExpense() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      amount: "",
      tags: []
    },
  });

  const navigate = useNavigate();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.post("/api/v1/expenses", values);
      if (res.status != 200) {
        console.log("Error creating expense")
      }
      toast.success("Expense created")
      navigate({ to: "/expenses" })
    } catch (err) {
      console.log(err)
      toast.error("Error creating expense")
    }
  }

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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Grocery shopping" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter tags separated by commas"
                        value={field.value?.join(', ') || ''}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value ? value.split(',').map(tag => tag.trim()) : []);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Optional: Separate tags with commas (e.g. groceries, food, household)
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              {form.formState.isSubmitting ? <Loader2 className="animate-spin" /> : "Create Expense"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
