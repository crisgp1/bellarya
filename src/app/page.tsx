'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { SearchFilterBar } from '@/components/search-filter-bar';
import { CategorySection } from '@/components/category-section';
import { LanguageSelector } from '@/components/language-selector';
import { LanguageSwitcher } from '@/components/language-switcher';
import { categorias } from '@/lib/menu-data';
import { FilterState, Categoria, MenuItem } from '@/types/menu';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

export default function Home() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<Categoria>('entradas');
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [mounted, setMounted] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    precioRango: 'todos',
    proteina: [],
    tiempoPrep: 'todos',
    picante: null,
  });
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);
  const navScrollRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lastScrollTimeRef = useRef<number>(0);

  // Ref to track and cleanup language transition timeouts
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fadeInTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleLanguageSelect = (lang: 'es' | 'en') => {
    // Clear any pending timeouts to prevent race conditions
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    if (fadeInTimeoutRef.current) {
      clearTimeout(fadeInTimeoutRef.current);
    }

    if (lang !== language) {
      // Fade out animation
      if (contentRef.current) {
        contentRef.current.style.opacity = '0.5';
        contentRef.current.style.transform = 'translateY(-4px)';
      }

      // Change language after a brief delay
      transitionTimeoutRef.current = setTimeout(() => {
        setLanguage(lang);
        if (typeof window !== 'undefined') {
          localStorage.setItem('preferred-language', lang);
        }

        // Fade in animation
        fadeInTimeoutRef.current = setTimeout(() => {
          if (contentRef.current) {
            contentRef.current.style.opacity = '1';
            contentRef.current.style.transform = 'translateY(0)';
          }
        }, 100);
      }, 200);
    } else {
      setLanguage(lang);
      if (typeof window !== 'undefined') {
        localStorage.setItem('preferred-language', lang);
      }
    }
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
      if (fadeInTimeoutRef.current) {
        clearTimeout(fadeInTimeoutRef.current);
      }
    };
  }, []);

  // Initialize language from localStorage on mount
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('preferred-language');
      if (savedLanguage === 'en' || savedLanguage === 'es') {
        setLanguage(savedLanguage);
      }
    }
  }, []);

  // Fetch menu items from API
  useEffect(() => {
    if (!mounted) return;

    const abortController = new AbortController();

    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/menu?lang=${language}`, {
          signal: abortController.signal,
        });
        const result = await response.json();

        if (result.success) {
          setMenuItems(result.data);
        } else {
          setError(result.error || 'Error al cargar el menú');
        }
      } catch (err) {
        // Don't set error if request was aborted (component unmounted or language changed)
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        setError('Error de conexión al servidor');
        console.error('Error fetching menu:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();

    // Cleanup: abort fetch if language changes or component unmounts
    return () => {
      abortController.abort();
    };
  }, [language, mounted]);

  // Filter and search logic
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          item.nombre.toLowerCase().includes(query) ||
          item.nombreItalia?.toLowerCase().includes(query) ||
          item.descripcion.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Price range filter
      if (filters.precioRango !== 'todos') {
        if (filters.precioRango === 'bajo' && item.precio >= 200) return false;
        if (filters.precioRango === 'medio' && (item.precio < 200 || item.precio > 400)) return false;
        if (filters.precioRango === 'alto' && item.precio <= 400) return false;
      }

      // Protein filter
      if (filters.proteina.length > 0) {
        if (!item.proteina || !item.proteina.some((p) => filters.proteina.includes(p))) {
          return false;
        }
      }

      // Time prep filter
      if (filters.tiempoPrep !== 'todos' && item.tiempoPrep) {
        if (filters.tiempoPrep === 'rapido' && item.tiempoPrep >= 15) return false;
        if (filters.tiempoPrep === 'medio' && (item.tiempoPrep < 15 || item.tiempoPrep > 25)) return false;
        if (filters.tiempoPrep === 'largo' && item.tiempoPrep <= 25) return false;
      }

      // Spicy filter
      if (filters.picante !== null) {
        if (filters.picante && !item.picante) return false;
        if (!filters.picante && item.picante) return false;
      }

      return true;
    });
  }, [menuItems, searchQuery, filters]);

  // Group by category
  const itemsByCategory = useMemo(() => {
    const grouped: Record<Categoria, typeof menuItems> = {
      entradas: [],
      'bellarya-in-casa': [],
      pescados: [],
      pollo: [],
      salmon: [],
      pulpo: [],
      camarones: [],
      mejillones: [],
      pizzas: [],
      pastas: [],
      postres: [],
      bebidas: [],
      vinos: [],
    };

    filteredItems.forEach((item) => {
      // Skip items with invalid categories (for backwards compatibility)
      if (grouped[item.categoria]) {
        grouped[item.categoria].push(item);
      } else {
        console.warn(`Item "${item.nombre}" has invalid category: ${item.categoria}`);
      }
    });

    return grouped;
  }, [filteredItems]);

  const handleCategoryIntersect = (categoria: Categoria) => {
    // Ignorar intersecciones durante scroll programático reciente (últimos 1000ms)
    const timeSinceLastProgrammaticScroll = Date.now() - lastScrollTimeRef.current;
    if (isScrollingRef.current && timeSinceLastProgrammaticScroll < 1000) return;

    setActiveTab(categoria);

    // Scroll automático al tab activo solo si está fuera de vista
    const tabElement = document.getElementById(`tab-${categoria}`);
    if (tabElement && navScrollRef.current) {
      const navContainer = navScrollRef.current;
      const tabRect = tabElement.getBoundingClientRect();
      const containerRect = navContainer.getBoundingClientRect();

      // Verificar si el tab está fuera del viewport del navbar
      const isOutOfView =
        tabRect.left < containerRect.left + 20 ||
        tabRect.right > containerRect.right - 20;

      // Solo hacer scroll si el tab no es visible
      if (isOutOfView) {
        tabElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  };

  const scrollToCategory = (categoria: Categoria) => {
    const element = document.getElementById(`categoria-${categoria}`);
    if (element) {
      // Marcar que estamos haciendo scroll programático y guardar timestamp
      isScrollingRef.current = true;
      lastScrollTimeRef.current = Date.now();

      // Actualizar tab inmediatamente
      setActiveTab(categoria);

      // NO hacer scroll automático del navbar cuando el usuario hace clic
      // El usuario debe poder deslizar el navbar manualmente después del clic
      // Solo scrollearemos el navbar cuando se hace scroll en las secciones (handleCategoryIntersect)

      // Usar scrollIntoView que respeta scroll-margin-top de las secciones
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      // Limpiar timeout previo
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Desactivar flag después del scroll
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
    }
  };

  const checkScrollButtons = () => {
    if (!navScrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = navScrollRef.current;

    // Use requestAnimationFrame to throttle updates and prevent layout thrashing
    requestAnimationFrame(() => {
      setShowLeftScroll(scrollLeft > 10);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10);
    });
  };

  const scrollNav = (direction: 'left' | 'right') => {
    if (!navScrollRef.current) return;
    const scrollAmount = 200;
    navScrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const navElement = navScrollRef.current;
    if (!navElement) return;

    // Asegurar que el navbar inicie desde el principio (scroll = 0)
    navElement.scrollLeft = 0;

    // Verificar botones en el próximo frame después del scroll
    requestAnimationFrame(() => {
      checkScrollButtons();
    });

    navElement.addEventListener('scroll', checkScrollButtons);
    window.addEventListener('resize', checkScrollButtons);

    return () => {
      navElement.removeEventListener('scroll', checkScrollButtons);
      window.removeEventListener('resize', checkScrollButtons);
      // Limpiar timeout al desmontar
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <LanguageSelector onLanguageSelect={handleLanguageSelect} />
      <div className="min-h-screen bg-background max-w-screen overflow-x-clip">
        {/* Sticky header + navbar container */}
        <div className="sticky top-0 z-40">
          {/* Header */}
          <header className="border-b border-border/30 bg-background/95 backdrop-blur-md">
            <div className="container mx-auto px-4 md:px-6 lg:px-12 py-4 md:py-6">
              <div className="flex items-center justify-between gap-4">
                <div className="hidden sm:flex sm:flex-1" />
                <div className="text-center flex-shrink-0">
                  <h1 className="logo text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wider font-medium">BELLARYA</h1>
                  <p className="display-text text-muted-foreground text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] font-light italic">Cucina Italiana</p>
                </div>
                <div className="flex-1 sm:flex-1 flex justify-end">
                  {mounted && <LanguageSwitcher currentLanguage={language} onLanguageChange={handleLanguageSelect} />}
                </div>
              </div>
            </div>
          </header>

          {/* Navbar */}
          <div className="bg-background/95 backdrop-blur-lg border-y-2 border-border w-full">
          <div className="container mx-auto relative px-0">
            {/* Gradiente izquierdo (solo visual) */}
            {showLeftScroll && (
              <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 md:w-20 bg-gradient-to-r from-background/80 to-transparent pointer-events-none z-[5]" />
            )}

            {/* Contenedor scrollable - Increased z-index and improved mobile touch */}
            <div
              ref={navScrollRef}
              className="relative z-[6] w-full flex justify-start md:justify-center overflow-x-auto gap-1.5 sm:gap-2 py-1 scrollbar-thin scrollbar-thumb-foreground/20 scrollbar-track-transparent hover:scrollbar-thumb-foreground/40 px-4 md:px-6 lg:px-12"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(0,0,0,0.2) transparent',
                WebkitOverflowScrolling: 'touch',
                touchAction: 'pan-x',
              }}
            >
              {categorias.map((cat) => (
                <button
                  key={cat.id}
                  id={`tab-${cat.id}`}
                  type="button"
                  onClick={() => scrollToCategory(cat.id as Categoria)}
                  className={`min-h-[40px] sm:min-h-[44px] px-4 sm:px-5 md:px-7 whitespace-nowrap text-xs sm:text-sm md:text-base uppercase tracking-wide font-semibold transition-all flex-shrink-0 touch-manipulation ${
                    activeTab === cat.id
                      ? 'bg-foreground text-background'
                      : 'bg-transparent hover:bg-muted'
                  }`}
                  style={{ touchAction: 'manipulation' }}
                >
                  {language === 'en' ? cat.labelEn : cat.label}
                </button>
              ))}
            </div>

            {/* Gradiente derecho (solo visual) */}
            {showRightScroll && (
              <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 md:w-20 bg-gradient-to-l from-background/80 to-transparent pointer-events-none z-[5]" />
            )}

            {/* Botón scroll izquierda - Hidden on mobile, fixed positioning */}
            {showLeftScroll && (
              <button
                type="button"
                onClick={() => scrollNav('left')}
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 px-2 sm:px-3 bg-gradient-to-r from-background via-background/95 to-transparent items-center pointer-events-auto"
                style={{ height: 'calc(100% - 2px)' }}
                aria-label="Scroll left"
              >
                <div className="bg-foreground text-background p-1.5 sm:p-2 hover:bg-foreground/90 transition-all rounded-sm">
                  <CaretLeft weight="bold" className="h-4 w-4 md:h-5 md:w-5" />
                </div>
              </button>
            )}

            {/* Botón scroll derecha - Hidden on mobile, fixed positioning */}
            {showRightScroll && (
              <button
                type="button"
                onClick={() => scrollNav('right')}
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 px-2 sm:px-3 bg-gradient-to-l from-background via-background/95 to-transparent items-center pointer-events-auto"
                style={{ height: 'calc(100% - 2px)' }}
                aria-label="Scroll right"
              >
                <div className="bg-foreground text-background p-1.5 sm:p-2 hover:bg-foreground/90 transition-all rounded-sm">
                  <CaretRight weight="bold" className="h-4 w-4 md:h-5 md:w-5" />
                </div>
              </button>
            )}
          </div>
        </div>
        </div>

        {/* Content con animación */}
        <div
          ref={contentRef}
          className="container mx-auto px-4 md:px-6 lg:px-12 max-w-7xl transition-all duration-300 ease-out"
          style={{ opacity: 1, transform: 'translateY(0)' }}
        >
          <SearchFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filters={filters}
            onFiltersChange={setFilters}
            language={language}
          />

          <main className="py-4 md:py-6 lg:py-8">
          {loading && (
            <div className="text-center py-16">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
              <p className="text-muted-foreground mt-4">Cargando menú...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-16">
              <p className="text-destructive text-lg">{error}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Reintentar
              </button>
            </div>
          )}

          {!loading && !error && (
            <>
              {filteredItems.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">
                    No se encontraron platillos que coincidan con tu búsqueda.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Intenta con otros términos o ajusta los filtros.
                  </p>
                </div>
              ) : (
                categorias.map((cat) => (
                  <CategorySection
                    key={cat.id}
                    categoria={cat.id as Categoria}
                    items={itemsByCategory[cat.id as Categoria]}
                    onIntersect={handleCategoryIntersect}
                  />
                ))
              )}
            </>
          )}
          </main>
        </div>

        <footer className="border-t border-border/30 mt-12 md:mt-16 lg:mt-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 py-8 md:py-10 lg:py-12 text-center">
            <div className="space-y-3 md:space-y-4">
              <h2 className="logo text-2xl md:text-3xl tracking-wider font-medium">BELLARYA</h2>
              <p className="display-text text-muted-foreground text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] italic">Cucina Italiana di Alta Qualità</p>
              <div className="pt-4 md:pt-6 text-[10px] md:text-xs text-muted-foreground/70 space-y-2">
                <p>{language === 'en' ? 'Prices expressed in Mexican pesos (MXN)' : 'Precios expresados en pesos mexicanos (MXN)'}</p>
                <p className="text-[9px] md:text-[10px]">
                  {language === 'en' ? 'Developed by' : 'Desarrollado por'}{' '}
                  <a
                    href="https://hyrk.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors underline decoration-dotted underline-offset-2"
                  >
                    hyrk.io
                  </a>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
