import { createKindeServerClient, GrantType, type SessionManager, type UserType } from "@kinde-oss/kinde-typescript-sdk";
import { type Context } from "hono";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";

// Client for authorization code flow
export const kindeClient = createKindeServerClient(GrantType.AUTHORIZATION_CODE, {
  authDomain: process.env.KINDE_DOMAIN!,
  clientId: process.env.clientId!,
  clientSecret: process.env.secret!,
  redirectURL: process.env.redirectUrl!,
  logoutRedirectURL: "http://localhost:5173/api/v1/auth/logout",
});

// Client for client credentials flow
const kindeApiClient = createKindeServerClient(GrantType.CLIENT_CREDENTIALS, {
  authDomain: process.env.KINDE_DOMAIN!,
  clientId: process.env.clientId!,
  clientSecret: process.env.secret!,
  logoutRedirectURL: "http://localhost:5173/api/v1/auth/me",
});


let store: Record<string, unknown> = {};

export const sessionManager = (c: Context): SessionManager => ({
  async getSessionItem(key: string) {
    const result = getCookie(c, key);
    return result;
  },
  async setSessionItem(key: string, value: unknown) {
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
    } as const;
    if (typeof value === "string") {
      setCookie(c, key, value, cookieOptions);
    } else {
      setCookie(c, key, JSON.stringify(value), cookieOptions);
    }
  },
  async removeSessionItem(key: string) {
    deleteCookie(c, key);
  },
  async destroySession() {
    ["id_token", "access_token", "user", "refresh_token"].forEach((key) => {
      deleteCookie(c, key);
    });
  },
});


type Env = {
  Variables: {
    user: UserType
  }
}


export const getUser = createMiddleware<Env>(async (c, next) => {

  try {
    const manager = sessionManager(c);

    const isAuthenticated = await kindeClient.isAuthenticated(manager);

    if (!isAuthenticated) {
      return c.json({ error: "Unauthorized" }, 401)
    }

    const user = await kindeClient.getUserProfile(manager);
    c.set("user", user);
    await next();
  } catch (err) {
    console.log(err)
    return c.json({ error: "Unauthorized" }, 401)
  }
})

