import { z } from 'zod'

const envSchema = z.object({
  BETTER_AUTH_URL: z.string().url().default('http://localhost:4321'),
  PUBLIC_SNIPCART_API_KEY: z.string().optional(),
})

const _env = envSchema.safeParse(import.meta.env)

if (!_env.success) {
  console.error('❌ Invalid environment variables:', JSON.stringify(_env.error.format(), null, 2))
  throw new Error('Invalid environment variables')
}

export const env = _env.data
