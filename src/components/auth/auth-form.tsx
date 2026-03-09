'use client'

import { useActionState, useState } from 'react'
import { signIn, signUp } from '@/lib/auth-client'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'

export function AuthForm() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [state, formAction, isPending] = useActionState(
    async (_prevState: any, formData: FormData) => {
      const email = formData.get('email') as string
      const password = formData.get('email') as string
      const name = formData.get('name') as string

      try {
        if (mode === 'signup') {
          const { error } = await signUp.email({ email, password, name })
          if (error) return { error: error.message }
        } else {
          const { error } = await signIn.email({ email, password })
          if (error) return { error: error.message }
        }

        window.location.href = '/'
        return { error: null }
      } catch (err) {
        return { error: 'An unexpected error ocured' }
      }
    },
    { error: null },
  )

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>{mode === 'login' ? 'Login' : 'Create Account'}</CardTitle>
        <CardDescription>
          {mode === 'login'
            ? 'Enter your email to sing in to your account'
            : 'Enter your details to create a new account'}
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="John Doe" required />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="jdoe@example.com"
              required
              autoComplete="off"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="new-password"
            />
          </div>
          {state?.error && (
            <p className="text-sm tex-red-500 font-medium">{state.error}</p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending
              ? 'Processing...'
              : mode === 'login'
                ? 'Login'
                : 'Sign Up'}
          </Button>
          <Button
            type="button"
            variant="link"
            className="w-full"
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
          >
            {mode === 'login'
              ? "Don't have an account? Sign up"
              : 'Already have an account? Login'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
