import { Hono } from "hono";


export const router = new Hono();

router.get("/ok", (c) => {
  return c.json({
    message: "OK"
  })
})
