import { z } from "zod";

export const createExpenseSchema = z.object({
  title: z.string().nonempty(),
  amount: z.number().positive(),
  tags: z.array(z.string()).optional(),
})
