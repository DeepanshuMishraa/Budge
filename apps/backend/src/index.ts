import { Hono } from "hono"
import { logger } from "hono/logger";
import { authRouter } from "./routes/auth";
import { expensesRoute } from "./routes/expense";


const api = new Hono().basePath("/api/v1");
api.route("/auth", authRouter)
api.route("/expenses", expensesRoute)

api.get("/health", (c) => {
  return c.json({
    message: "working"
  })
})

export default api;

