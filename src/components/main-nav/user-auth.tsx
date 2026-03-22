'use client'

import { LogOut, Heart } from 'lucide-react'
import { authClient, signOut } from '../../lib/auth-client'
import { useAuthRedirect } from '@/hooks/use-auth-redirect'
import { Button } from '../ui/button'
import { UserDropdown } from './user-dropdown'

interface UserAuthProps {
  session: any
  mobile?: boolean
}

export function UserAuth({ session, mobile = false }: UserAuthProps) {
  const { data: sessionData, isPending } = authClient.useSession()

  const currentUser = sessionData?.user || session?.user

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

  if (isPending && !currentUser && !session) {
    return <div className={mobile ? 'h-12' : 'w-16 h-8'} />
  }

  if (currentUser) {
    if (!mobile) {
      return <UserDropdown user={currentUser} onLogout={handleLogout} />
    }

    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black">
            {currentUser.name[0]}
          </div>
          <div>
            <p className="font-black italic text-sm">{currentUser.name}</p>
            <p className="text-xs text-nav-fg/60">{currentUser.email}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <a
            href="/favorites"
            className="flex items-center justify-center gap-2 bg-secondary text-secondary-foreground py-3 rounded-md font-bold uppercase tracking-widest text-sm w-full"
          >
            <Heart size={18} />
            My Favorites
          </a>

          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full flex items-center justify-center gap-2 bg-destructive text-destructive-foreground py-3 rounded-md font-bold uppercase tracking-widest text-sm"
          >
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Button asChild variant={mobile ? 'default' : 'outline'}>
      <a href={`/auth?returnTo=${encodeURIComponent(currentPath)}`}>
        Login {mobile && '/ Join Now'}
      </a>
    </Button>
  )
}
