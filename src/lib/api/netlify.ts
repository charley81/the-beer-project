/**
 * Generic handler for Netlify form submissions.
 * 
 * @param formName - The name attribute of the form (must match the HTML form name).
 * @param data - The form data object to submit.
 * @throws Error if the submission fails.
 */
import { encode } from '../utils'

export async function submitToNetlify(formName: string, data: Record<string, any>) {
  const response = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encode({
      'form-name': formName,
      ...data,
    }),
  })

  if (!response.ok) {
    throw new Error(`Submission failed with status: ${response.status}`)
  }

  return true
}
