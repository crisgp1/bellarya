'use client';

import { useState, useEffect, useRef } from 'react';
import { Globe } from '@phosphor-icons/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LanguageSwitcherProps {
  currentLanguage: 'es' | 'en';
  onLanguageChange: (lang: 'es' | 'en') => void;
}

export function LanguageSwitcher({ currentLanguage, onLanguageChange }: LanguageSwitcherProps) {
  const [showNotification, setShowNotification] = useState(false);
  const notificationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleLanguageChange = (lang: 'es' | 'en') => {
    if (lang !== currentLanguage) {
      onLanguageChange(lang);
      setShowNotification(true);

      // Clear any existing timeout
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }

      // Hide notification after 2 seconds
      notificationTimeoutRef.current = setTimeout(() => {
        setShowNotification(false);
      }, 2000);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Language Switcher using shadcn DropdownMenu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 border border-border/30 hover:border-foreground/30 transition-all duration-300 bg-background/80 backdrop-blur-sm group"
            aria-label="Change language"
          >
            <Globe weight="thin" className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-foreground/70 group-hover:text-foreground transition-colors" />
            <span className="text-[10px] sm:text-xs md:text-sm font-light uppercase tracking-wider sm:tracking-widest text-foreground/70 group-hover:text-foreground transition-colors">
              {currentLanguage}
            </span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[120px] sm:min-w-[140px] border-2">
          <DropdownMenuItem
            onClick={() => handleLanguageChange('es')}
            className={`px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm font-light uppercase tracking-wide cursor-pointer ${
              currentLanguage === 'es'
                ? 'bg-foreground text-background'
                : ''
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span>{currentLanguage === 'es' ? 'Español' : 'Spanish'}</span>
              <span className="text-xs opacity-60">🇲🇽</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleLanguageChange('en')}
            className={`px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm font-light uppercase tracking-wide cursor-pointer ${
              currentLanguage === 'en'
                ? 'bg-foreground text-background'
                : ''
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span>{currentLanguage === 'es' ? 'Inglés' : 'English'}</span>
              <span className="text-xs opacity-60">🇺🇸</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-[calc(100vw-2rem)]">
          <div className="bg-foreground text-background px-4 sm:px-6 py-3 sm:py-4 shadow-2xl border-2 border-foreground flex items-center gap-2 sm:gap-3">
            <Globe weight="fill" className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <div className="text-xs sm:text-sm font-light">
              {currentLanguage === 'es' ? (
                <>Idioma cambiado a <span className="font-semibold">Español</span></>
              ) : (
                <>Language changed to <span className="font-semibold">English</span></>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
