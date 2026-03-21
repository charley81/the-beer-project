import { createAuthClient } from 'better-auth/react'

/**
 * LESSON: Client-side Auth Client
 * We MUST NOT import { env } from 'better-auth' here, as that is the 
 * server-side package. We use import.meta.env for client-side environment variables.
 */
export const authClient = createAuthClient({
  baseURL: import.meta.env.PUBLIC_BETTER_AUTH_URL,
})

export const { signIn, signUp, signOut, useSession } = authClient
