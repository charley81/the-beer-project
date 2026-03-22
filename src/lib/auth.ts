import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db, User, Session, Account, Verification } from 'astro:db'
import { env } from './env'

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  trustedOrigins: [env.BETTER_AUTH_URL], // In Netlify explicitly list production URL as trusted origin
  database: drizzleAdapter(db, {
    provider: 'sqlite', // Astro DB uses LibSQL, which is SQLite-compatible
    schema: {
      user: User,
      session: Session,
      account: Account,
      verification: Verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
})
