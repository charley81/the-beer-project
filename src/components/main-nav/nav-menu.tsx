'use client'

import * as React from 'react'
import { Menu, ShoppingCart } from 'lucide-react'
import { navLinks } from '@/lib/navigation'
import { UserAuth } from './user-auth'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'
import { Button } from '../ui/button'
import { CartBadge } from '../ecommerce/cart-badge'

const NavLinks = ({
  mobile = false,
  onSelect,
  pathname,
}: {
  mobile?: boolean
  onSelect?: () => void
  pathname: string
}) => {
  const isActive = (href: string) => {
    if (!pathname) return false
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <ul
      className={`flex ${mobile ? 'flex-col gap-6 mt-8' : 'items-center gap-6'}`}
    >
      {navLinks.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            onClick={onSelect}
            className={`transition-colors  ${
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
}

export function NavMenu({
  session: initialSession,
  pathname: initialPathname,
}: {
  session: any
  pathname: string
}) {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = initialPathname || '/'

  return (
    <div className="flex items-center gap-4">
      <div className="hidden lg:flex items-center gap-6">
        <NavLinks pathname={pathname} />

        <div className="h-6 w-px bg-nav-fg/20 mx-2" />

        <button className="snipcart-checkout relative p-2 text-nav-fg hover:text-primary transition-colors cursor-pointer group">
          <ShoppingCart size={24} />
          <CartBadge />
        </button>

        <UserAuth session={initialSession} />
      </div>

      <div className="lg:hidden flex items-center gap-3">
        <button className="snipcart-checkout relative p-2 text-nav-fg hover:text-primary transition-colors cursor-pointer group">
          <ShoppingCart size={28} />
          <CartBadge className="w-5 h-5" />
        </button>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              className="p-2 text-nav-fg hover:text-primary transition-colors cursor-pointer"
              variant="ghost"
              size="icon"
            >
              <Menu size={32} />
              <span className="sr-only">Open Menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-75 sm:w-max-sm bg-nav text-nav-fg border-l-primary/20"
          >
            <SheetHeader className="text-left border-b border-nav-fg/10 pb-4">
              <SheetTitle className="text-nav-fg text-2xl font-black italic">
                The <span className="text-primary">Beer</span> Project
              </SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col h-full justify-between pb-12 px-4">
              <div className="flex flex-col gap-8">
                <NavLinks
                  mobile
                  pathname={pathname}
                  onSelect={() => setIsOpen(false)}
                />
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
