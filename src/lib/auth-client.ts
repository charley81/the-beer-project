import { createAuthClient } from 'better-auth/react'

/**
 * LESSON: Client-side Auth Client
 * In Astro, you don't need to pass the baseURL if you're using the default path (/api/auth).
 * This ensures the client uses relative paths, avoiding CORS and protocol issues in production.
 */
export const authClient = createAuthClient()

export const { signIn, signUp, signOut, useSession } = authClient
