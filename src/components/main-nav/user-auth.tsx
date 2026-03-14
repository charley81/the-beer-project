'use client'

import { LogOut } from 'lucide-react'
import { authClient, signOut } from '../../lib/auth-client'
import { useAuthRedirect } from '@/hooks/use-auth-redirect'

interface UserAuthProps {
  session: any
  mobile?: boolean
}

export function UserAuth({ session, mobile = false }: UserAuthProps) {
  const { data: sessionData } = authClient.useSession()

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

  if (currentUser) {
    return (
      <div
        className={`flex ${mobile ? 'flex-col gap-6' : 'items-center gap-4'}`}
      >
        <div className={`flex items-center gap-3 ${!mobile && 'mr-2'}`}>
          {mobile && (
            <div className="w-10 h-10 rouded-full bg-primary flex items-center justify-center text-primary-foreground font-black">
              {currentUser.name[0]}
            </div>
          )}
          <div>
            <p className="font-black italic text-sm">{currentUser.name}</p>
            {mobile && (
              <p className="text-xs text-nav-fg/60">{currentUser.email}</p>
            )}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className={`${mobile ? 'w-full flex items-center justify-center gap-2 bg-destructive text-destructive-foreground py-3 rounded-md font-bold uppercase tracking-widest text-sm' : 'text-destructive text-xs uppercase font-bold cursor-pointer hover:underline'}`}
        >
          {mobile && <LogOut size={18} />}
          Logout
        </button>
      </div>
    )
  }

  return (
    <a
      href={`/auth?returnTo=${encodeURIComponent(currentPath)}`}
      className={`${mobile ? 'w-full flex items-center justify-center bg-primary text-primary-foreground py-4 rounded-md font-black uppercase tracking-widest tex-lg shadow-lg' : 'border-2 border-primary px-3 py-1 rounded-md text-xs font-bold uppercase hover:bg-primary hover:text-primary-foreground transition-all '}`}
    >
      Login {mobile && '/ Join Now'}
    </a>
  )
}
