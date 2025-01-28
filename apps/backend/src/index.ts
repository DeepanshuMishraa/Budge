import { Hono } from "hono"
import { logger } from "hono/logger";
import { authRouter } from "./routes/auth";


const api = new Hono().basePath("/api/v1");
api.route("/auth", authRouter)

api.get("/health", (c) => {
  return c.json({
    message: "working"
  })
})

export default api;

