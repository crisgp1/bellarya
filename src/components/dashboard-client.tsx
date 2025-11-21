'use client';

import { useState, useEffect } from 'react';
import { MenuItem, Categoria } from '@/types/menu';
import { MenuTable } from './menu-table';
import { MenuGrid } from './menu-grid';
import { MenuForm } from './menu-form';
import { Plus, SignOut, ForkKnife, List, SquaresFour } from '@phosphor-icons/react';
import { Button } from './ui/button';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type ViewMode = 'list' | 'grid';

export function DashboardClient() {
  const router = useRouter();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<Categoria | 'all'>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/menu');
      const data = await response.json();
      if (data.success) {
        setMenuItems(data.data);
      }
    } catch (error) {
      console.error('Error fetching menu:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: MenuItem) => {
    setSelectedItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este platillo?')) {
      return;
    }

    try {
      const response = await fetch(`/api/menu/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchMenuItems();
      } else {
        alert('Error al eliminar el platillo');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Error al eliminar el platillo');
    }
  };

  const handleSave = async () => {
    await fetchMenuItems();
    setIsFormOpen(false);
    setSelectedItem(null);
  };

  const handleNewItem = () => {
    setSelectedItem(null);
    setIsFormOpen(true);
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const filteredItems = filterCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.categoria === filterCategory);

  // Get unique categories from menu items
  const uniqueCategories = Array.from(new Set(menuItems.map(item => item.categoria))).sort();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/30 bg-background sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/')}
                className="flex items-center gap-2 hover:opacity-70 transition-opacity"
              >
                <ForkKnife weight="duotone" className="h-6 w-6" />
                <div>
                  <h1 className="logo text-2xl tracking-wider font-medium">BELLARYA</h1>
                  <p className="display-text text-muted-foreground text-[10px] uppercase tracking-[0.3em] font-light">
                    Admin Dashboard
                  </p>
                </div>
              </button>
            </div>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="flex items-center gap-2"
            >
              <SignOut weight="bold" className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 lg:px-12 py-6 md:py-8">
        <div className="mb-6 md:mb-8 space-y-4 md:space-y-6">
          {/* Header with Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-1 md:mb-2">
                Menu Management
              </h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Administra los platillos del menú
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* View Toggle */}
              <div className="flex items-center border-2 border-border rounded-sm overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-foreground text-background'
                      : 'bg-background text-foreground hover:bg-muted'
                  }`}
                  title="Vista en cuadrícula"
                >
                  <SquaresFour weight="bold" className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${
                    viewMode === 'list'
                      ? 'bg-foreground text-background'
                      : 'bg-background text-foreground hover:bg-muted'
                  }`}
                  title="Vista en lista"
                >
                  <List weight="bold" className="h-5 w-5" />
                </button>
              </div>
              <Button
                onClick={handleNewItem}
                className="flex items-center gap-2 bg-foreground text-background hover:bg-foreground/90"
                size="default"
              >
                <Plus weight="bold" className="h-5 w-5" />
                <span className="hidden sm:inline">Nuevo Platillo</span>
                <span className="sm:hidden">Nuevo</span>
              </Button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Filtrar por Categoría
            </h3>
            <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
              <div className="flex gap-2 min-w-max md:min-w-0 md:flex-wrap pb-2 md:pb-0">
                <Button
                  variant={filterCategory === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilterCategory('all')}
                  size="sm"
                  className="text-xs md:text-sm shrink-0"
                >
                  Todos ({menuItems.length})
                </Button>
                {uniqueCategories.map((cat) => {
                  const count = menuItems.filter(item => item.categoria === cat).length;
                  return (
                    <Button
                      key={cat}
                      variant={filterCategory === cat ? 'default' : 'outline'}
                      onClick={() => setFilterCategory(cat as Categoria)}
                      size="sm"
                      className="text-xs md:text-sm capitalize shrink-0"
                    >
                      {cat.replace(/-/g, ' ')} ({count})
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-12 md:py-20">
            <div className="text-muted-foreground">Cargando...</div>
          </div>
        ) : (
          <>
            {viewMode === 'list' ? (
              <MenuTable
                items={filteredItems}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ) : (
              <MenuGrid
                items={filteredItems}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30 bg-background mt-12 md:mt-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-12 py-6">
          <div className="text-center">
            <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-[0.2em] font-medium">
              Powered by{' '}
              <a
                href="https://hyrk.io"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold hover:text-foreground transition-colors"
              >
                HYRK.IO
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Form Modal */}
      {isFormOpen && (
        <MenuForm
          item={selectedItem}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedItem(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
