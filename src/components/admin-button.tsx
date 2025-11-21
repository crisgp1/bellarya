'use client';

import { SignIn, SignOut, User } from '@phosphor-icons/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function AdminButton() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (status === 'loading') {
    return null; // Don't show anything while loading
  }

  if (!session?.user) {
    // Not logged in - show discrete login icon
    return (
      <Link
        href="/login"
        className="p-2 hover:bg-muted transition-colors rounded-sm opacity-30 hover:opacity-100"
        title="Admin Login"
        aria-label="Admin Login"
      >
        <User weight="thin" className="h-4 w-4 text-foreground/70" />
      </Link>
    );
  }

  // Logged in - show user dropdown
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="p-2 hover:bg-muted transition-colors rounded-sm"
          aria-label="Admin Menu"
        >
          <User weight="fill" className="h-4 w-4 text-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <div className="px-2 py-1.5 text-sm font-medium">
          {session.user.name || session.user.email}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="cursor-pointer">
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <form action="/api/auth/signout" method="POST" className="w-full">
            <button
              type="submit"
              className="w-full text-left flex items-center gap-2"
            >
              <SignOut weight="thin" className="h-4 w-4" />
              Sign Out
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
