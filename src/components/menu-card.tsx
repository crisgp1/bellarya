'use client';

import { MenuItem } from '@/types/menu';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useEffect, useRef, useState } from 'react';
import { animate } from 'motion';
import { Clock, Pepper } from '@phosphor-icons/react';
import { AllergenIcons } from './allergen-icons';

interface MenuCardProps {
  item: MenuItem;
}

const formatPrecio = (precio: number): string => {
  const formatted = new Intl.NumberFormat('es-MX', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(precio);
  return formatted;
};

export function MenuCard({ item }: MenuCardProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Get language from localStorage
  const language = typeof window !== 'undefined'
    ? (localStorage.getItem('preferred-language') as 'es' | 'en') || 'es'
    : 'es';

  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      // Resetear el estilo inicial
      contentRef.current.style.opacity = '0';
      contentRef.current.style.transform = 'translateY(4px) translateZ(0)';

      // Animar después de un pequeño delay para asegurar que el DOM esté listo
      requestAnimationFrame(() => {
        if (contentRef.current) {
          (animate as any)(
            contentRef.current,
            { opacity: [0, 1], transform: ['translateY(4px) translateZ(0)', 'translateY(0) translateZ(0)'] },
            { duration: 0.3, easing: [0.16, 1, 0.3, 1] }
          );
        }
      });
    }
  }, [isOpen]);

  return (
    <Dialog onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card
          ref={cardRef}
          style={{ opacity: 0 }}
          className={`will-animate cursor-pointer transition-all duration-200 hover:shadow-2xl hover:border-foreground min-h-[44px] border-2 bg-card group ${
            item.destacado ? 'border-accent shadow-lg' : 'border-border'
          }`}
        >
          <CardHeader className="p-5 md:p-6 lg:p-8">
            {item.destacado && (
              <Badge className="mb-3 md:mb-4 w-fit bg-accent text-accent-foreground font-semibold uppercase tracking-wider text-xs">
                Recomendado del Chef
              </Badge>
            )}
            <div className="flex items-start justify-between gap-6 md:gap-8">
              <div className="flex-1 min-w-0 space-y-3 md:space-y-4">
                <div className="space-y-2">
                  <CardTitle className="text-xl md:text-2xl font-semibold leading-tight tracking-tight group-hover:text-foreground transition-colors">
                    {item.nombre}
                    {item.picante && (
                      <Pepper weight="fill" className="inline-block ml-2 h-5 w-5 text-red-600" aria-label="Picante" />
                    )}
                  </CardTitle>
                  {item.nombreItalia && (
                    <p className="text-sm md:text-base text-muted-foreground italic mt-1.5 font-medium">
                      {item.nombreItalia}
                    </p>
                  )}
                </div>
                <CardDescription className="line-clamp-3 text-base md:text-lg leading-relaxed font-medium text-foreground/80">
                  {item.descripcion}
                </CardDescription>
              </div>
              <div className="flex flex-col items-end justify-start gap-1 min-w-[120px]">
                <div className="price text-3xl md:text-4xl whitespace-nowrap text-foreground">
                  ${formatPrecio(item.precio)}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground font-semibold uppercase tracking-wide">MXN</div>
              </div>
            </div>
            {item.tiempoPrep && item.tiempoPrep > 20 && (
              <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-muted-foreground">
                <Clock weight="regular" className="h-4 w-4" />
                <span className="text-sm font-semibold number">{item.tiempoPrep} min</span>
              </div>
            )}
            <AllergenIcons alergenos={item.alergenos} />
          </CardHeader>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[90vw] md:max-w-2xl max-h-[85vh] overflow-y-auto will-animate">
        <div ref={contentRef} className="space-y-3 md:space-y-5">
          <DialogHeader className="space-y-3 md:space-y-4">
            {item.destacado && (
              <Badge className="w-fit bg-accent text-accent-foreground font-semibold uppercase tracking-wider text-[10px] md:text-xs">
                Recomendado del Chef
              </Badge>
            )}
            <div className="space-y-1.5 md:space-y-2">
              <DialogTitle className="text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight leading-tight">
                {item.nombre}
                {item.picante && (
                  <Pepper weight="fill" className="inline-block ml-2 h-4 md:h-5 w-4 md:w-5 text-red-600" aria-label="Picante" />
                )}
              </DialogTitle>
              {item.nombreItalia && (
                <p className="text-xs md:text-sm lg:text-base text-muted-foreground italic font-medium">
                  {item.nombreItalia}
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-2 md:gap-3 items-center">
              <div className="flex items-baseline gap-1 md:gap-1.5">
                <span className="price text-2xl md:text-3xl font-bold">${formatPrecio(item.precio)}</span>
                <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider font-semibold">MXN</span>
              </div>
              {item.tiempoPrep && (
                <div className="flex items-center gap-1 md:gap-1.5 text-muted-foreground/70">
                  <Clock weight="thin" className="h-3.5 md:h-4 w-3.5 md:w-4" />
                  <span className="text-xs md:text-sm uppercase tracking-wide number">{item.tiempoPrep} min</span>
                </div>
              )}
              {item.subcategoria && (
                <Badge variant="secondary" className="capitalize font-medium tracking-wide text-xs">
                  {item.subcategoria}
                </Badge>
              )}
            </div>
          </DialogHeader>
          <DialogDescription className="text-xs md:text-sm lg:text-base leading-[1.6] md:leading-[1.7] pt-3 md:pt-4 text-foreground/80 font-medium">
            {item.descripcion}
          </DialogDescription>
          {item.proteina && item.proteina.length > 0 && (
            <div className="pt-4 md:pt-6 border-t border-border">
              <p className="text-[10px] md:text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                {language === 'en' ? 'Proteins' : 'Proteínas'}
              </p>
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {item.proteina.map((prot) => {
                  const proteinTranslations: Record<string, string> = {
                    'res': language === 'en' ? 'Beef' : 'Res',
                    'cerdo': language === 'en' ? 'Pork' : 'Cerdo',
                    'pollo': language === 'en' ? 'Chicken' : 'Pollo',
                    'pescado': language === 'en' ? 'Fish' : 'Pescado',
                    'mariscos': language === 'en' ? 'Seafood' : 'Mariscos',
                    'cordero': language === 'en' ? 'Lamb' : 'Cordero',
                  };
                  return (
                    <Badge key={prot} variant="outline" className="capitalize font-medium text-xs">
                      {proteinTranslations[prot] || prot}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}
          {item.alergenos && item.alergenos.length > 0 && (
            <div className="pt-4 md:pt-6 border-t border-border">
              <p className="text-[10px] md:text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                {language === 'en' ? 'Allergens' : 'Alérgenos'}
              </p>
              <AllergenIcons alergenos={item.alergenos} />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
