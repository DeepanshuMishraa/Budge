import type { Env as HonoEnv } from 'hono'

export interface Bindings extends HonoEnv {
  JWT_SECRET?: string;
  // Add other env variables here
}

export function getConfig(env: Bindings) {
  return {
    jwtSecret: env.JWT_SECRET || 'default-secret',
    // Add other config values
  }
} 
