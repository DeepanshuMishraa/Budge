import { Hono } from "hono"
import { logger } from "hono/logger";
import { router } from "./routes/api";


const app = new Hono();
app.use("*", logger());
app.route("/api/v1", router);

app.get("/", (c) => {
  return c.json({
    message: "working"
  })
})

export default app;

