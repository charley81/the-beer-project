'use client'

import * as React from 'react'
import { Menu } from 'lucide-react'
import { navLinks } from '@/lib/navigation'
import { UserAuth } from './user-auth'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'

export function NavMenu({
  session: initialSession,
  pathname: initialPathname,
}: {
  session: any
  pathname: string
}) {
  const [isOpen, setIsOpen] = React.useState(false)

  const pathname = initialPathname

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <ul
      className={`flex ${mobile ? 'flex-col gap-6 mt-8' : 'items-center gap-6'}`}
    >
      {navLinks.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            onClick={() => setIsOpen(false)}
            className={`transition-colors font-bold ${
              isActive(link.href)
                ? 'text-primary underline decoration-2 underline-offset-4'
                : 'hover:text-primary text-nav-fg'
            } ${mobile ? 'text-2xl' : 'text-sm uppercase'}`}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  )

  return (
    <div className="flex items-center">
      <div className="hidden lg:flex items-center gap-8">
        <NavLinks />
        <div className="h-6 w-px bg-nav-fg/20 mx-2" />
        <UserAuth session={initialSession} />
      </div>

      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="p-2 text-nav-fg hover:text-primary transition-colors cursor-pointer">
              <Menu size={32} />
              <span className="sr-only">Open Menu</span>
            </button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[300px] sm:w-max-sm bg-nav text-nav-fg border-l-primary/20"
          >
            <SheetHeader className="text-left border-b border-nav-fg/10 pb-4">
              <SheetTitle className="text-nav-fg text-2xl font-black italic">
                The <span className="text-primary">Beer</span> Project
              </SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col h-full justify-between pb-12">
              <div className="flex flex-col gap-8">
                <NavLinks mobile />
              </div>

              <div className="border-t border-nav-fg/10 pt-8 mt-auto">
                <UserAuth session={initialSession} mobile />
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
