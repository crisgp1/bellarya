'use client';

import { useState, useEffect, useRef } from 'react';
import { Globe } from '@phosphor-icons/react';

interface LanguageSwitcherProps {
  currentLanguage: 'es' | 'en';
  onLanguageChange: (lang: 'es' | 'en') => void;
}

export function LanguageSwitcher({ currentLanguage, onLanguageChange }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const notificationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleLanguageChange = (lang: 'es' | 'en') => {
    if (lang !== currentLanguage) {
      onLanguageChange(lang);
      setIsOpen(false);
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

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 6,
        right: window.innerWidth - rect.right,
      });
    }
  }, [isOpen]);

  return (
    <>
      {/* Language Switcher Button */}
      <div className="relative">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 border border-border/30 hover:border-foreground/30 transition-all duration-300 bg-background/80 backdrop-blur-sm group"
          aria-label="Change language"
        >
          <Globe weight="thin" className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-foreground/70 group-hover:text-foreground transition-colors" />
          <span className="text-[10px] sm:text-xs md:text-sm font-light uppercase tracking-wider sm:tracking-widest text-foreground/70 group-hover:text-foreground transition-colors">
            {currentLanguage}
          </span>
        </button>

        {/* Dropdown - Portal con fixed positioning */}
        {isOpen && (
          <>
            {/* Backdrop - shadcn uses z-50 for overlays */}
            <div
              className="fixed inset-0 z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu - shadcn uses z-50 for dropdowns */}
            <div
              className="fixed z-50 border-2 border-border bg-background shadow-xl min-w-[120px] sm:min-w-[140px] overflow-hidden"
              style={{
                top: `${menuPosition.top}px`,
                right: `${menuPosition.right}px`,
              }}
            >
              <button
                type="button"
                onClick={() => handleLanguageChange('es')}
                className={`w-full px-3 sm:px-5 py-2 sm:py-3 text-left text-xs sm:text-sm font-light uppercase tracking-wide transition-all duration-200 flex items-center justify-between ${
                  currentLanguage === 'es'
                    ? 'bg-foreground text-background'
                    : 'hover:bg-muted text-foreground/80 hover:text-foreground'
                }`}
              >
                <span>{currentLanguage === 'es' ? 'Español' : 'Spanish'}</span>
                <span className="text-xs opacity-60">🇲🇽</span>
              </button>
              <button
                type="button"
                onClick={() => handleLanguageChange('en')}
                className={`w-full px-3 sm:px-5 py-2 sm:py-3 text-left text-xs sm:text-sm font-light uppercase tracking-wide transition-all duration-200 flex items-center justify-between ${
                  currentLanguage === 'en'
                    ? 'bg-foreground text-background'
                    : 'hover:bg-muted text-foreground/80 hover:text-foreground'
                }`}
              >
                <span>{currentLanguage === 'es' ? 'Inglés' : 'English'}</span>
                <span className="text-xs opacity-60">🇺🇸</span>
              </button>
            </div>
          </>
        )}
      </div>

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
