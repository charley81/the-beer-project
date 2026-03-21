'use client'

import { z } from 'zod'
import { FormWrapper } from '../ui/form-wrapper'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import { Send, Loader2 } from 'lucide-react'
import { type UseFormReturn } from 'react-hook-form'
import { submitToNetlify } from '@/lib/api/netlify'

/**
 * Contact Form Zod Schema
 */
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
})

type ContactFormValues = z.infer<typeof contactSchema>

export function ContactForm() {
  /**
   * The submission handler for Netlify.
   */
  const handleSubmit = async (data: ContactFormValues, form: UseFormReturn<ContactFormValues>) => {
    try {
      await submitToNetlify('contact', data)
      toast.success('Message sent successfully! We will get back to you soon.')
      form.reset() 
    } catch (error) {
      // The useFormHandler hook catches this and displays the error toast,
      // but we re-throw to ensure the flow is correct.
      throw new Error('Could not submit the form. Please try again later.')
    }
  }

  return (
    <FormWrapper
      name="contact"
      netlify={true}
      schema={contactSchema}
      onSubmit={handleSubmit}
      defaultValues={{ name: '', email: '', message: '' }}
      className="space-y-6 bg-card p-8 rounded-2xl border border-border/50 shadow-sm"
    >
      {({ isPending, form }) => (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your Name" 
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
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">Message</FormLabel>
                <FormControl>
                  <textarea 
                    {...field}
                    rows={5}
                    placeholder="How can we help you?"
                    className="flex min-h-[120px] w-full rounded-md border border-primary/20 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 font-medium resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            disabled={isPending}
            className="w-full h-12 font-black uppercase tracking-widest rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-95 mt-2"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Sending...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="h-4 w-4" /> Send Message
              </span>
            )}
          </Button>
        </>
      )}
    </FormWrapper>
  )
}
