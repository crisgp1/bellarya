'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { FilterState } from '@/types/menu';
import { MagnifyingGlass, Faders, X, Sparkle } from '@phosphor-icons/react';
import { proteinasDisponibles } from '@/lib/menu-data';

interface SearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  language: 'es' | 'en'; // Receive language from parent
}

export function SearchFilterBar({
  searchQuery,
  onSearchChange,
  filters,
  onFiltersChange,
  language,
}: SearchFilterBarProps) {

  const activeFiltersCount = [
    filters.precioRango !== 'todos',
    filters.proteina.length > 0,
    filters.tiempoPrep !== 'todos',
    filters.picante !== null,
  ].filter(Boolean).length;

  const resetFilters = () => {
    onFiltersChange({
      precioRango: 'todos',
      proteina: [],
      tiempoPrep: 'todos',
      picante: null,
    });
  };

  const toggleProteina = (prot: string) => {
    const newProteinas = filters.proteina.includes(prot)
      ? filters.proteina.filter((p) => p !== prot)
      : [...filters.proteina, prot];
    onFiltersChange({ ...filters, proteina: newProteinas });
  };

  return (
    <div className="py-4 md:py-6 lg:py-8">
      <div className="flex gap-2 md:gap-3 items-center">
        <div className="relative flex-1 max-w-xl">
          <MagnifyingGlass weight="thin" className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
          <Input
            type="search"
            placeholder={language === 'en' ? 'Search...' : 'Buscar...'}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 md:pl-11 pr-3 md:pr-4 h-11 md:h-12 text-sm md:text-base border-border/30 bg-background focus:border-foreground/30 transition-all font-light rounded-none"
          />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="h-11 md:h-12 px-4 md:px-6 border-border/30 hover:border-foreground/30 hover:bg-transparent transition-all font-light uppercase tracking-wider md:tracking-widest text-[10px] md:text-xs rounded-none"
            >
              <Faders weight="thin" className="h-4 w-4 mr-1.5 md:mr-2" />
              <span className="hidden sm:inline">{language === 'en' ? 'Filters' : 'Filtros'}</span>
              <span className="sm:hidden">{language === 'en' ? 'Filters' : 'Filtros'}</span>
              {activeFiltersCount > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-foreground text-background text-[10px] number">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-lg overflow-y-auto px-8">
            <SheetHeader className="space-y-6 pb-12 border-b border-border/20">
              <SheetTitle className="text-2xl font-light tracking-tight">{language === 'en' ? 'Filters' : 'Filtros'}</SheetTitle>
              <SheetDescription className="text-sm font-light text-muted-foreground/70">
                {language === 'en' ? 'Refine your search' : 'Refina tu búsqueda'}
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-12 overflow-y-auto max-h-[calc(100vh-200px)] py-10">
              {/* Rango de precio */}
              <div>
                <label className="text-xs font-light mb-6 block uppercase tracking-widest text-muted-foreground">{language === 'en' ? 'Price' : 'Precio'}</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'todos', label: language === 'en' ? 'All' : 'Todos' },
                    { value: 'bajo', label: '< $200' },
                    { value: 'medio', label: '$200 - $400' },
                    { value: 'alto', label: '> $400' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        onFiltersChange({
                          ...filters,
                          precioRango: option.value as FilterState['precioRango'],
                        })
                      }
                      className={`text-center px-6 py-4 border transition-all min-h-[48px] text-sm font-light ${
                        filters.precioRango === option.value
                          ? 'bg-foreground text-background border-foreground'
                          : 'hover:border-foreground/30 border-border/40'
                      }`}
                    >
                      <span className={option.value !== 'todos' ? 'number' : ''}>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tipo de proteína */}
              <div>
                <label className="text-xs font-light mb-6 block uppercase tracking-widest text-muted-foreground">{language === 'en' ? 'Protein Type' : 'Tipo de Proteína'}</label>
                <div className="grid grid-cols-2 gap-3">
                  {proteinasDisponibles.map((prot) => {
                    const proteinTranslations: Record<string, string> = {
                      'res': language === 'en' ? 'Beef' : 'Res',
                      'cerdo': language === 'en' ? 'Pork' : 'Cerdo',
                      'pollo': language === 'en' ? 'Chicken' : 'Pollo',
                      'pescado': language === 'en' ? 'Fish' : 'Pescado',
                      'mariscos': language === 'en' ? 'Seafood' : 'Mariscos',
                      'cordero': language === 'en' ? 'Lamb' : 'Cordero',
                    };
                    return (
                      <button
                        key={prot}
                        type="button"
                        onClick={() => toggleProteina(prot)}
                        className={`capitalize min-h-[48px] px-6 py-4 border transition-all text-sm font-light ${
                          filters.proteina.includes(prot)
                            ? 'bg-foreground text-background border-foreground'
                            : 'hover:border-foreground/30 border-border/40'
                        }`}
                      >
                        {proteinTranslations[prot] || prot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tiempo de preparación */}
              <div>
                <label className="text-xs font-light mb-6 block uppercase tracking-widest text-muted-foreground">{language === 'en' ? 'Time' : 'Tiempo'}</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'todos', label: language === 'en' ? 'All' : 'Todos' },
                    { value: 'rapido', label: '< 15 min' },
                    { value: 'medio', label: '15-25 min' },
                    { value: 'largo', label: '> 25 min' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        onFiltersChange({
                          ...filters,
                          tiempoPrep: option.value as FilterState['tiempoPrep'],
                        })
                      }
                      className={`text-center px-6 py-4 border transition-all min-h-[48px] text-sm font-light ${
                        filters.tiempoPrep === option.value
                          ? 'bg-foreground text-background border-foreground'
                          : 'hover:border-foreground/30 border-border/40'
                      }`}
                    >
                      <span className="number">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Picante */}
              <div>
                <label className="text-xs font-light mb-6 block uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Sparkle weight="thin" className="h-3.5 w-3.5" />
                  {language === 'en' ? 'Spicy' : 'Picante'}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: null, label: language === 'en' ? 'All' : 'Todos' },
                    { value: true, label: language === 'en' ? 'Yes' : 'Sí' },
                    { value: false, label: 'No' },
                  ].map((option) => (
                    <button
                      key={String(option.value)}
                      type="button"
                      onClick={() =>
                        onFiltersChange({
                          ...filters,
                          picante: option.value,
                        })
                      }
                      className={`text-center px-6 py-4 border transition-all min-h-[48px] text-sm font-light ${
                        filters.picante === option.value
                          ? 'bg-foreground text-background border-foreground'
                          : 'hover:border-foreground/30 border-border/40'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Reset button - fixed at bottom */}
            {activeFiltersCount > 0 && (
              <div className="sticky bottom-0 left-0 right-0 py-6 bg-background border-t border-border/20">
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="w-full h-12 font-light uppercase tracking-widest text-xs border-border/40 hover:border-foreground hover:bg-foreground hover:text-background transition-all rounded-none"
                >
                  <X weight="thin" className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Clear Filters' : 'Limpiar Filtros'}
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
