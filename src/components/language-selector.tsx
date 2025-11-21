'use client';

import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Globe } from '@phosphor-icons/react';
import { animate } from 'motion';

interface LanguageSelectorProps {
  onLanguageSelect: (lang: 'es' | 'en') => void;
}

export function LanguageSelector({ onLanguageSelect }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const selectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Verificar si ya se mostró en esta sesión
    const hasSeenLanguageSelector = sessionStorage.getItem('language-selector-shown');

    // También verificar si ya hay un idioma guardado
    const savedLanguage = localStorage.getItem('preferred-language');

    // Solo mostrar si no se ha visto en esta sesión Y no hay idioma guardado
    if (!hasSeenLanguageSelector && !savedLanguage) {
      // Mostrar después de un pequeño delay para una entrada suave
      setTimeout(() => {
        setIsOpen(true);
      }, 600);
    }
  }, []);

  const handleLanguageSelect = async (lang: 'es' | 'en') => {
    setIsSelecting(true);

    // Clear any pending timeout
    if (selectionTimeoutRef.current) {
      clearTimeout(selectionTimeoutRef.current);
    }

    // Animación sutil de confirmación
    if (contentRef.current && iconRef.current) {
      // Suave fade y scale del contenido
      await (animate as any)(
        contentRef.current,
        {
          opacity: [1, 0.85, 1],
          scale: [1, 0.98, 1]
        },
        {
          duration: 0.6,
          easing: [0.16, 1, 0.3, 1] // cubic-bezier ease-out
        }
      );

      // Animación del ícono - rotación muy sutil
      await (animate as any)(
        iconRef.current,
        {
          rotate: [0, 5, 0],
          scale: [1, 1.08, 1]
        },
        {
          duration: 0.5,
          easing: [0.16, 1, 0.3, 1]
        }
      );
    }

    // Pequeño delay para que se aprecie la animación
    selectionTimeoutRef.current = setTimeout(() => {
      sessionStorage.setItem('language-selector-shown', 'true');
      onLanguageSelect(lang);
      setIsOpen(false);
    }, 200);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (selectionTimeoutRef.current) {
        clearTimeout(selectionTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="max-w-[calc(100vw-2rem)] sm:max-w-md border-2 border-border p-0 gap-0 will-animate overflow-hidden"
        showCloseButton={false}
      >
        <div ref={contentRef} className="relative">
          {/* Header con icono */}
          <div className="flex flex-col items-center gap-3 sm:gap-5 pt-8 sm:pt-12 pb-6 sm:pb-10 px-4 sm:px-8 border-b border-border/20">
            <div ref={iconRef} className="relative">
              <div className="absolute inset-0 bg-foreground/5 blur-xl rounded-full"></div>
              <div className="relative bg-background border border-border/30 p-3 sm:p-5 rounded-full">
                <Globe weight="thin" className="h-7 w-7 sm:h-9 sm:w-9 text-foreground" />
              </div>
            </div>
            <div className="text-center space-y-2 sm:space-y-3">
              <DialogTitle className="text-xl sm:text-2xl md:text-3xl font-light tracking-tight">
                Bienvenido
                <span className="text-muted-foreground/50 mx-1 sm:mx-2">/</span>
                Welcome
              </DialogTitle>
              <p className="text-xs sm:text-sm text-muted-foreground/80 font-light leading-relaxed max-w-xs px-2 sm:px-0">
                Seleccione su idioma preferido para continuar
              </p>
            </div>
          </div>

          {/* Opciones de idioma */}
          <div className="grid grid-cols-2 gap-0 bg-muted/20">
            <button
              type="button"
              onClick={() => handleLanguageSelect('es')}
              disabled={isSelecting}
              className="group relative p-6 sm:p-10 border-r border-border/20 hover:bg-background transition-all duration-500 flex flex-col items-center gap-3 sm:gap-5 disabled:pointer-events-none"
            >
              <div className="text-4xl sm:text-5xl opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 transform">
                🇲🇽
              </div>
              <div className="text-center space-y-0.5 sm:space-y-1">
                <div className="text-base sm:text-lg font-light tracking-wide sm:tracking-widest uppercase text-foreground/90 group-hover:text-foreground transition-colors duration-300">
                  Español
                </div>
                <div className="text-[9px] sm:text-[10px] text-muted-foreground/60 uppercase tracking-[0.15em] sm:tracking-[0.2em] font-light">
                  México
                </div>
              </div>
              <div className="absolute inset-0 border border-transparent group-hover:border-foreground/10 transition-all duration-500 pointer-events-none" />
            </button>

            <button
              type="button"
              onClick={() => handleLanguageSelect('en')}
              disabled={isSelecting}
              className="group relative p-6 sm:p-10 hover:bg-background transition-all duration-500 flex flex-col items-center gap-3 sm:gap-5 disabled:pointer-events-none"
            >
              <div className="text-4xl sm:text-5xl opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 transform">
                🇺🇸
              </div>
              <div className="text-center space-y-0.5 sm:space-y-1">
                <div className="text-base sm:text-lg font-light tracking-wide sm:tracking-widest uppercase text-foreground/90 group-hover:text-foreground transition-colors duration-300">
                  English
                </div>
                <div className="text-[9px] sm:text-[10px] text-muted-foreground/60 uppercase tracking-[0.15em] sm:tracking-[0.2em] font-light">
                  United States
                </div>
              </div>
              <div className="absolute inset-0 border border-transparent group-hover:border-foreground/10 transition-all duration-500 pointer-events-none" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
