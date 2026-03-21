import type * as React from 'react'
import { Form } from './form'
import { useFormHandler } from '@/hooks/use-form-handler'
import { type UseFormProps, type UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { Alert, AlertDescription } from './alert'
import { AlertCircle } from 'lucide-react'

interface FormWrapperProps<T extends z.ZodType<any>> {
  schema: T
  onSubmit: (data: z.infer<T>, form: UseFormReturn<z.infer<T>>) => Promise<void>
  defaultValues?: UseFormProps<z.infer<T>>['defaultValues']
  children: (props: { isPending: boolean; form: UseFormReturn<z.infer<T>> }) => React.ReactNode
  className?: string
  // Netlify-specific props
  name?: string
  netlify?: boolean
}

/**
 * A generic form wrapper component that integrates shadcn's form provider
 * with the useFormHandler hook.
 */
export function FormWrapper<T extends z.ZodType<any>>({
  schema,
  onSubmit,
  defaultValues,
  children,
  className,
  name,
  netlify = false,
}: FormWrapperProps<T>) {
  const { form, isPending, handleSubmit } = useFormHandler(schema, onSubmit, {
    defaultValues,
  })

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit(e)
        }}
        className={className}
        name={name}
        data-netlify={netlify ? 'true' : undefined}
      >
        {/* Netlify-specific hidden input for form discovery */}
        {netlify && <input type="hidden" name="form-name" value={name} />}

        {/* Global form errors (from server/root) */}
        {form.formState.errors.root && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {String(form.formState.errors.root.message)}
            </AlertDescription>
          </Alert>
        )}

        {children({ isPending, form })}
      </form>
    </Form>
  )
}
