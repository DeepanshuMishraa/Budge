import { Hono } from "hono";
import { getUser, kindeClient, sessionManager } from "../../utils/kinde";
import { db } from "@budge/db/db"

export const authRouter = new Hono()



authRouter.get("/login", async (c) => {
  const loginUrl = await kindeClient.login(sessionManager(c));
  return c.redirect(loginUrl.toString());
});

authRouter.get("/register", async (c) => {
  const registerUrl = await kindeClient.register(sessionManager(c));
  return c.redirect(registerUrl.toString());
});


authRouter.get("/callback", async (c) => {
  const url = new URL(c.req.url);
  await kindeClient.handleRedirectToApp(sessionManager(c), url);

  // First verify authentication
  const isAuthenticated = await kindeClient.isAuthenticated(sessionManager(c));
  if (!isAuthenticated) {
    return c.redirect("/api/v1/auth/login");
  }

  // Then get user profile with error handling
  const user = await kindeClient.getUserProfile(sessionManager(c));
  if (!user || !user.id) {
    console.error("Failed to get user profile");
    return c.redirect("/api/v1/auth/login");
  }

  try {
    await db.user.upsert({
      where: { id: user.id },
      create: {
        id: user.id,
        email: user.email,
        firstName: user.given_name,
        lastName: user.family_name,
        picture: user.picture as string,
        verified: true
      },
      update: {
        email: user.email,
        firstName: user.given_name,
        lastName: user.family_name,
        picture: user.picture,
        verified: true
      }
    });
  } catch (error) {
    console.error("Database error:", error);
    // Handle database errors appropriately
    return c.json({ error: "Failed to store user data" }, 500);
  }

  return c.redirect("/api/v1/auth/me");
});


authRouter.get("/logout", async (c) => {
  const logoutUrl = await kindeClient.logout(sessionManager(c));
  return c.redirect(logoutUrl.toString());
});


authRouter.get("/me", getUser, async (c) => {
  const user = c.var.user;
  return c.json({ user });
})

