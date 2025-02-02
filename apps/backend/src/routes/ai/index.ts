import { Hono } from "hono";
import { Chat } from "../../utils/ai";


export const aiRouter = new Hono();

aiRouter.get("/query", async (c) => {
  const query = "How to save money on groceries?"
  const response = await Chat(query);
  return c.json(response)
})
