'use client'

import { useActionState, useEffect, useState } from 'react'
import { useAuthRedirect } from '@/hooks/use-auth-redirect'
import { AlertDescription, Alert } from '../ui/alert'
import { signIn, signUp } from '@/lib/auth-client'
import { AlertCircle, Loader2, Eye, EyeOff, CircleCheck } from 'lucide-react'
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
  const [showPassword, setShowPassword] = useState(false)
  const { redirectToReturn } = useAuthRedirect()

  const [state, formAction, isPending] = useActionState(
    async (_prevState: any, formData: FormData) => {
      const email = formData.get('email') as string
      const password = formData.get('password') as string
      const name = formData.get('name') as string

      try {
        if (mode === 'signup') {
          const { error } = await signUp.email({ email, password, name })
          if (error) return { error: error.message, success: false }
        } else {
          const { error } = await signIn.email({ email, password })
          if (error) return { error: error.message, success: false }
        }

        return { error: null, success: true }
      } catch (err) {
        return { error: 'An unexpected error occurred', success: false }
      }
    },
    { error: null, success: false },
  )

  useEffect(() => {
    if (state?.success) {
      const timer = setTimeout(() => {
        redirectToReturn()
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [state?.success, redirectToReturn])

  return (
    <Card className="w-full max-w-lg mx-auto bg-card">
      <CardHeader>
        <CardTitle>{mode === 'login' ? 'Login' : 'Create Account'}</CardTitle>
        <CardDescription>
          {mode === 'login'
            ? 'Enter your email to sign in to your account'
            : 'Enter your details to create a new account'}
        </CardDescription>
      </CardHeader>
      <form action={formAction} className="mt-8">
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
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete={
                  mode === 'login' ? 'current-password' : 'new-password'
                }
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full mt-4" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                {mode === 'login' ? 'Logging in...' : 'Signing up'}
              </>
            ) : mode === 'login' ? (
              'Log in'
            ) : (
              'Sign up'
            )}
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
          {(state?.error || state?.success) && (
            <Alert variant={state?.success ? 'success' : 'destructive'}>
              {state?.success ? (
                <CircleCheck className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertDescription>
                {state?.success
                  ? `${mode === 'login' ? 'Logged in' : 'Account created'}
      successfully! Redirecting...`
                  : state?.error}
              </AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </form>
    </Card>
  )
}
