'use client'

import * as React from 'react'
import { LogOut, Heart, User as UserIcon, Settings } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'

interface UserDropdownProps {
  user: {
    name: string
    email: string
    image?: string | null
  }
  onLogout: () => Promise<void>
}

export function UserDropdown({ user, onLogout }: UserDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-auto flex items-center gap-3 px-2 hover:bg-primary/10 transition-colors rounded-full">
          <Avatar className="h-8 w-8 border border-primary/20">
            <AvatarImage src={user.image || undefined} alt={user.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="hidden lg:inline-block font-black italic text-sm tracking-tight pr-1">
            {user.name}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mt-1" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-black leading-none italic">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="cursor-pointer focus:bg-primary/10 focus:text-primary transition-colors py-2.5">
            <a href="/favorites" className="flex w-full items-center">
              <Heart className="mr-3 h-4 w-4" />
              <span className="font-bold text-xs uppercase tracking-widest">My Favorites</span>
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem disabled className="cursor-not-allowed opacity-50 py-2.5">
            <Settings className="mr-3 h-4 w-4" />
            <span className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Settings (Coming Soon)</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={onLogout}
          className="cursor-pointer focus:bg-destructive/10 focus:text-destructive transition-colors py-2.5"
        >
          <LogOut className="mr-3 h-4 w-4" />
          <span className="font-bold text-xs uppercase tracking-widest">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
