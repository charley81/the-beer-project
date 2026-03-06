import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  baseURL: import.meta.env.BETTER_AUTH_URL || 'http://localhost:4321', // the base url of your auth server
})

export const { signIn, signUp, signOut, useSession } = authClient
