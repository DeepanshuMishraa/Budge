import { Hono } from "hono"
import { logger } from "hono/logger";
import { authRouter } from "./routes/auth";
import { expensesRoute } from "./routes/expense";
import { aiRouter } from "./routes/ai";


const app = new Hono();
app.use("*",logger())

app.basePath("/api/v1").route("/auth", authRouter).route("/expenses", expensesRoute).route("/ai",aiRouter)

app.get("/health", (c) => {
  return c.json({
    message: "working"
  })
})

export default app;

