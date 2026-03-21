'use client'

import { useState } from 'react'
import { z } from 'zod'
import { useAuthRedirect } from '@/hooks/use-auth-redirect'
import { signIn, signUp } from '@/lib/auth-client'
import { Eye, EyeOff, Loader2, LogIn, UserPlus } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { FormWrapper } from '../ui/form-wrapper'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { toast } from 'sonner'
import { type UseFormReturn } from 'react-hook-form'

/**
 * Auth Schemas
 */
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
})

const signupSchema = loginSchema.extend({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
})

export function AuthForm() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [showPassword, setShowPassword] = useState(false)
  const { redirectToReturn } = useAuthRedirect()

  const currentSchema = mode === 'login' ? loginSchema : signupSchema

  /**
   * Submission handler using better-auth client
   */
  const handleAuth = async (values: any, form: UseFormReturn<any>) => {
    console.log('Starting auth submission...', mode, values)
    
    if (mode === 'signup') {
      const result = await signUp.email({
        email: values.email,
        password: values.password,
        name: values.name,
      })
      console.log('Sign up result:', result)
      
      const { error } = result
      if (error) throw new Error(error.message || 'Failed to sign up.')
      toast.success('Account created! Redirecting...')
    } else {
      const result = await signIn.email({
        email: values.email,
        password: values.password,
      })
      console.log('Sign in result:', result)

      const { error } = result
      if (error) throw new Error(error.message || 'Failed to sign in.')
      toast.success('Logged in successfully! Redirecting...')
    }

    // Success lifecycle: short delay for feedback then redirect
    setTimeout(() => {
      redirectToReturn()
    }, 2000)
  }

  return (
    <Card className="w-full max-w-lg mx-auto bg-card border-border/50 shadow-xl overflow-hidden">
      <div className="h-1.5 bg-linear-to-r from-primary/40 via-primary to-primary/40" />
      <CardHeader className="pt-8">
        <CardTitle className="text-3xl font-black italic tracking-tight">
          {mode === 'login' ? 'Welcome Back' : 'Join the Club'}
        </CardTitle>
        <CardDescription className="font-medium text-base">
          {mode === 'login'
            ? 'Sign in to access your dashboard and favorites.'
            : 'Create an account to start saving your favorite breweries.'}
        </CardDescription>
      </CardHeader>

      <FormWrapper
        key={mode} // Reset form when switching modes
        schema={currentSchema}
        onSubmit={handleAuth}
        defaultValues={{ email: '', password: '', name: '' }}
      >
        {({ isPending, form }) => (
          <>
            <CardContent className="space-y-5 pt-4">
              {mode === 'signup' && (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="John Doe" 
                          {...field} 
                          className="h-12 border-primary/20 focus-visible:ring-primary font-medium"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="your@email.com" 
                        {...field} 
                        className="h-12 border-primary/20 focus-visible:ring-primary font-medium"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          {...field}
                          className="h-12 border-primary/20 focus-visible:ring-primary pr-12 font-medium"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground"
                          onClick={() => setShowPassword(!showPassword)}
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="flex flex-col gap-6 pb-10">
              <Button 
                type="submit" 
                disabled={isPending} 
                className="w-full h-14 font-black uppercase tracking-widest rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-95 text-base mt-2"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    {mode === 'login' ? 'Authenticating...' : 'Creating Account...'}
                  </>
                ) : mode === 'login' ? (
                  <span className="flex items-center gap-2">
                    <LogIn className="h-5 w-5" /> Log in
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5" /> Sign up
                  </span>
                )}
              </Button>

              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-xs uppercase font-black tracking-widest">
                  <span className="bg-card px-4 text-muted-foreground">Or</span>
                </div>
              </div>

              <Button
                type="button"
                variant="ghost"
                className="w-full font-bold text-primary hover:bg-primary/5 rounded-full"
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              >
                {mode === 'login'
                  ? "Don't have an account? Sign up now"
                  : 'Already have an account? Login here'}
              </Button>
            </CardFooter>
          </>
        )}
      </FormWrapper>
    </Card>
  )
}
