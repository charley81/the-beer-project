import { z } from 'zod'

const envSchema = z.object({
  BETTER_AUTH_URL: z
    .string()
    .default(
      import.meta.env.PROD
        ? 'https://thebeerproject.netlify.app/'
        : 'http://localhost:4321',
    ),
})

const _env = envSchema.safeParse(import.meta.env)

if (!_env.success) {
  const prettyError = z.prettifyError(_env.error)
  console.error('❌ Invalid environment variables:\n', prettyError)
  throw new Error('Invalid environment variables')
}

export const env = _env.data
