import { useState, useEffect, useCallback } from 'react'

export function useAuthRedirect() {
  const [currentPath, setCurrentPath] = useState('/')

  useEffect(() => {
    if (typeof window !== undefined) {
      setCurrentPath(window.location.pathname)
    }
  }, [])

  const redirectToReturn = useCallback(() => {
    if (typeof window !== undefined) {
      const params = new URLSearchParams(window.location.search)

      const target = params.get('returnTo') || '/'

      window.location.href = target
    }
  }, [])

  return { currentPath, redirectToReturn }
}
