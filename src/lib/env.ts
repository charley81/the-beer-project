import { z } from 'zod'

const envSchema = z.object({
  BETTER_AUTH_URL: z.string().url().default('http://localhost:4321'),
  PUBLIC_SNIPCART_API_KEY: z.string().min(1, "Snipcart API Key is required"),
})

const _env = envSchema.safeParse(import.meta.env)

if (!_env.success) {
  const prettyError = z.prettifyError(_env.error)
  console.error('❌ Invalid environment variables:\n', prettyError)
  throw new Error('Invalid environment variables')
}

export const env = _env.data
