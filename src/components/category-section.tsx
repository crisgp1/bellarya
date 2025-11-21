'use client';

import { MenuItem, Categoria } from '@/types/menu';
import { MenuCard } from './menu-card';
import { useEffect, useRef, useState } from 'react';
import { animate } from 'motion';
import { CaretDown, CaretUp } from '@phosphor-icons/react';

interface CategorySectionProps {
  categoria: Categoria;
  items: MenuItem[];
  onIntersect?: (categoria: Categoria) => void;
}

export function CategorySection({ categoria, items, onIntersect }: CategorySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);
  const toggleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const maxItems = 12;
  const displayItems = showAll ? items : items.slice(0, maxItems);

  const handleToggle = () => {
    setShowAll(!showAll);
    if (gridRef.current && showAll) {
      // Scroll suave cuando se colapsa
      if (toggleTimeoutRef.current) {
        clearTimeout(toggleTimeoutRef.current);
      }
      toggleTimeoutRef.current = setTimeout(() => {
        gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  };

  // Cleanup toggle timeout on unmount
  useEffect(() => {
    return () => {
      if (toggleTimeoutRef.current) {
        clearTimeout(toggleTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!onIntersect || !sectionRef.current) return;

    let timeoutId: NodeJS.Timeout | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Debounce más corto para mejor responsividad
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
              onIntersect(categoria);
            }, 50);
          }
        });
      },
      {
        rootMargin: '-15% 0px -75% 0px',
        threshold: 0,
      }
    );

    observer.observe(sectionRef.current);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [categoria, onIntersect]);

  useEffect(() => {
    if (!headerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (animate as any)(
              entry.target,
              { opacity: [0, 1], transform: ['translateY(12px) translateZ(0)', 'translateY(0) translateZ(0)'] },
              { duration: 0.5, easing: [0.16, 1, 0.3, 1] }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(headerRef.current);

    return () => observer.disconnect();
  }, []);

  if (displayItems.length === 0) {
    return null;
  }

  // Get language from localStorage
  const language = typeof window !== 'undefined'
    ? (localStorage.getItem('preferred-language') as 'es' | 'en') || 'es'
    : 'es';

  const categoriaTitulosEs: Record<Categoria, string> = {
    entradas: 'Entradas',
    'bellarya-in-casa': 'Bellarya In Casa',
    pescados: 'Pescados',
    pollo: 'Pollo',
    salmon: 'Salmón',
    pulpo: 'Pulpo',
    camarones: 'Camarones',
    mejillones: 'Mejillones',
    pizzas: 'Pizzas',
    pastas: 'Pastas',
    postres: 'Postres',
    bebidas: 'Bebidas',
    vinos: 'Vinos',
  };

  const categoriaTitulosEn: Record<Categoria, string> = {
    entradas: 'Appetizers',
    'bellarya-in-casa': 'Bellarya In Casa',
    pescados: 'Fish',
    pollo: 'Chicken',
    salmon: 'Salmon',
    pulpo: 'Octopus',
    camarones: 'Shrimp',
    mejillones: 'Mussels',
    pizzas: 'Pizzas',
    pastas: 'Pastas',
    postres: 'Desserts',
    bebidas: 'Drinks',
    vinos: 'Wines',
  };

  const categoriaTitulos = language === 'en' ? categoriaTitulosEn : categoriaTitulosEs;

  return (
    <section
      ref={sectionRef}
      id={`categoria-${categoria}`}
      className="scroll-mt-32 mb-24 md:mb-32 pb-12 md:pb-16 border-b-2 border-border"
    >
      <div ref={headerRef} style={{ opacity: 0 }} className="will-animate mb-16 md:mb-20">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 md:mb-6 uppercase">
          {categoriaTitulos[categoria]}
        </h2>
        <div className="w-32 md:w-40 h-0.5 bg-foreground"></div>
      </div>
      <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
        {displayItems.map((item, index) => (
          <MenuCard key={item._id || item.id || `${item.nombre}-${index}`} item={item} />
        ))}
      </div>
      {items.length > maxItems && (
        <div className="mt-12 md:mt-16 flex flex-col items-center gap-3">
          <p className="text-xs text-muted-foreground/70 uppercase tracking-wider number font-semibold">
            {showAll
              ? (language === 'en' ? `Showing ${items.length} dishes` : `Mostrando ${items.length} platillos`)
              : (language === 'en' ? `Showing ${maxItems} of ${items.length} dishes` : `Mostrando ${maxItems} de ${items.length} platillos`)
            }
          </p>
          <button
            type="button"
            onClick={handleToggle}
            className="min-h-[44px] px-6 md:px-8 py-2.5 md:py-3 bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 font-semibold uppercase tracking-wide text-sm md:text-base flex items-center gap-2"
          >
            {showAll ? (
              <>
                {language === 'en' ? 'Show less' : 'Ver menos'}
                <CaretUp weight="bold" className="h-4 w-4" />
              </>
            ) : (
              <>
                {language === 'en' ? `View all (${items.length - maxItems} more)` : `Ver todos (${items.length - maxItems} más)`}
                <CaretDown weight="bold" className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
}
