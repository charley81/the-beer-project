import { useTransition, useCallback } from 'react'
import { useForm, type UseFormProps, type FieldValues, type UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'

interface UseFormHandlerReturn<T extends z.ZodType<any>> {
  form: UseFormReturn<z.infer<T>>
  isPending: boolean
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
}

/**
 * A reusable hook for handling Zod-validated forms in React 19.
 */
export function useFormHandler<T extends z.ZodType<any>>(
  schema: T,
  onSubmit: (data: z.infer<T>, form: UseFormReturn<z.infer<T>>) => Promise<void>,
  options?: UseFormProps<z.infer<T>>
): UseFormHandlerReturn<T> {
  const [isPending, startTransition] = useTransition()
  
  const form = useForm<z.infer<T>>({
    mode: 'onTouched', // Get faster feedback on blur/touch
    ...options,
    resolver: zodResolver(schema),
  })

  // Wrap the submit handler to ensure it stays stable and handles transitions
  const handleSubmit = useCallback(
    form.handleSubmit(
      async (data) => {
        // Clear root errors before starting
        form.clearErrors('root')
        
        startTransition(async () => {
          try {
            await onSubmit(data, form)
          } catch (error: any) {
            console.error('Form Submission Error:', error)
            
            // Map field errors if they exist in the error object
            if (error.fields) {
              Object.keys(error.fields).forEach((key) => {
                form.setError(key as any, { 
                  message: error.fields[key] 
                })
              })
            }
            
            const errorMessage = error.message || 'An unexpected error occurred. Please try again.'
            
            // Set root error for global alert
            form.setError('root', { message: errorMessage })
            
            // Show toast for immediate feedback
            toast.error(errorMessage)
          }
        })
      },
      (errors) => {
        console.error('Form Validation Errors:', errors)
        toast.error('Please check the form for errors.')
      }
    ),
    [form, onSubmit]
  )

  return { 
    form, 
    isPending, 
    handleSubmit
  }
}
