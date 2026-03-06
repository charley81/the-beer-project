import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db, User, Session, Account, Verification } from 'astro:db'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg', // Use "pg" for Astro DB/Turso as they share the same dialect
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
