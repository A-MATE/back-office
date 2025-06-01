'use client';

import { useState, useEffect } from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { UserNav } from '@/components/dashboard/user-nav';
import { usePathname } from 'next/navigation';
import { Icons } from '@/components/icons';

interface HeaderProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function Header({ user }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [pageTitle, setPageTitle] = useState('Dashboard');

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Update page title based on pathname
    const path = pathname.split('/').filter(Boolean);
    if (path.length > 1) {
      // Capitalize the first letter and replace hyphens with spaces
      setPageTitle(
        path[1].charAt(0).toUpperCase() +
          path[1].slice(1).replace(/-/g, ' ')
      );
    } else {
      setPageTitle('Dashboard');
    }
  }, [pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 transition-all duration-200',
        scrolled && 'shadow-sm'
      )}
    >
      <div className="hidden md:block">
        <h1 className="text-xl font-semibold">{pageTitle}</h1>
      </div>
      <div className="flex-1 md:hidden">
        <h1 className="text-lg font-semibold">{pageTitle}</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Icons.help className="h-4 w-4" />
          <span className="sr-only">Help</span>
        </Button>
        <ModeToggle />
        <UserNav />
      </div>
    </header>
  );
}