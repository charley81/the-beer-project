import { useState, useEffect, useCallback } from 'react'

export function useAuthRedirect() {
  const [currentPath, setCurrentPath] = useState('/')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updatePath = () => setCurrentPath(window.location.pathname)
      
      updatePath()
      
      document.addEventListener('astro:after-swap', updatePath)
      return () => document.removeEventListener('astro:after-swap', updatePath)
    }
  }, [])

  const redirectToReturn = useCallback(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)

      const target = params.get('returnTo') || '/'

      window.location.href = target
    }
  }, [])

  return { currentPath, redirectToReturn }
}
