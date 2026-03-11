'use client'

import { authClient, signOut } from '../lib/auth-client'
import { useAuthRedirect } from '@/hooks/use-auth-redirect'

interface UserMenuProps {
  initialSession?: any
}

export function UserMenu({ initialSession }: { initialSession: any }) {
  const { data: sessionData, isPending } = authClient.useSession()
  const session = sessionData || initialSession

  // remember where user waas and redirect them back after they log in.
  const { currentPath } = useAuthRedirect()

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = '/'
        },
      },
    })
  }

  // While loading the session cookie, show nothing (to avoid flicker)
  if (isPending && typeof initialSession === 'undefined')
    return (
      <div
        className="w-24 h-8 bg-yellow-400
      animate-pulse rounded-md"
      />
    )

  if (session?.user) {
    return (
      <div className="flex items-center gap-4">
        <a
          href="/dashboard"
          className="hover:underline font-black
      text-yellow-900 italic"
        >
          Account ({session.user.name})
        </a>
        <button
          onClick={handleLogout}
          className="cursor-pointer hover:underline text-red-800 uppercase
      text-sm font-bold"
        >
          Logout
        </button>
      </div>
    )
  }

  return (
    <a
      href={`/auth?returnTo=${encodeURIComponent(currentPath)}`}
      className="hover:underline border-2 border-yellow-950 px-3 py-1
      rounded-sm uppercase text-sm font-bold"
    >
      Login
    </a>
  )
}
