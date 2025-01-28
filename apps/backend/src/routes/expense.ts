import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import { createExpenseSchema } from "@budge/common/schema"
import { db } from "@budge/db/db"
import { getUser } from "../utils/kinde";

export const expensesRoute = new Hono()

expensesRoute.post("/", getUser, zValidator('json', createExpenseSchema), async (c) => {
  try {
    const user = c.var.user;
    const expenseData = c.req.valid('json');

    const newExpense = await db.expense.create({
      data: {
        ...expenseData,
        userId: user.id
      }
    });

    return c.json(newExpense, 201);
  } catch (error) {
    return c.json({ error: "Failed to create expense" }, 500);
  }
})


expensesRoute.get("/", getUser, async (c) => {
  try {
    const user = c.var.user;
    const expenses = await db.expense.findFirst({
      where: {
        userId: user.id
      }
    })

    if (!expenses) {
      return c.json({ error: "No expenses found" }, 404);
    }

    return c.json(expenses, 201);
  } catch (error) {
    return c.json({ error: "Failed to get expenses" }, 500);
  }
})


expensesRoute.get("/:id", getUser, async (c) => {
  try {
    const id = c.req.param("id");
    const user = c.var.user;
    const expense = await db.expense.findFirst({
      where: {
        id: id,
        userId: user.id
      }
    });

    if (!expense) {
      return c.json({ error: "Expense not found" }, 404);
    }
  } catch (error) {
    return c.json({ error: "Failed to get expense" }, 500);
  }
})


expensesRoute.delete("/:id", getUser, async (c) => {
  try {
    const id = c.req.param("id");

    const user = c.var.user;

    const expense = await db.expense.findFirst({
      where: {
        id: id,
        userId: user.id
      }
    })

    if (!expense) {
      return c.json({ error: "Expense not found" }, 404);
    }

    await db.expense.delete({
      where: {
        id: id
      }
    })

    return c.json({ message: "Expense deleted" }, 200);
  } catch (err) {
    return c.json({ error: "Failed to delete expense" }, 500);
  }
})


expensesRoute.get("/analytics", getUser, async (c) => { 
  
})
