'use client'

import { useState } from 'react'
import { signIn, signUp } from '../../lib/auth-client'
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

export function AuthForm({ type }: { type: 'login' | 'signup' }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (type === 'signup') {
        const { error } = await signUp.email({
          email,
          password,
          name,
          callbackURL: '/',
        })
        if (error) setError(error.message || 'Signup Faild')
      } else {
        const { error } = await signIn.email({
          email,
          password,
          callbackURL: '/',
        })
        if (error) setError(error.message || 'Login Failed')
      }
    } catch (error) {
      setError('An unexpected error ocurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{type === 'login' ? 'Login' : 'CreateAccount'}</CardTitle>
        <CardDescription>
          {type === 'login'
            ? 'Enter your email to sign in'
            : 'Enter yourdetails to sign up'}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {type === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading
              ? 'Processing...'
              : type === 'login'
                ? 'Sign In'
                : 'Sign Up'}
          </Button>
          <p className="text-sm text-center">
            {type === 'login' ? (
              <>
                Don't have an account?{' '}
                <a
                  href="/signup"
                  className="text-blue-500
       hover:underline"
                >
                  Sign up
                </a>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <a
                  href="/login"
                  className="text-blue-500
       hover:underline"
                >
                  Log in
                </a>
              </>
            )}
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
