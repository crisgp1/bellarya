'use client';

import { useState, useEffect } from 'react';
import { MenuItem, Categoria } from '@/types/menu';
import { MenuTable } from './menu-table';
import { MenuForm } from './menu-form';
import { Plus, SignOut, ForkKnife } from '@phosphor-icons/react';
import { Button } from './ui/button';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function DashboardClient() {
  const router = useRouter();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<Categoria | 'all'>('all');

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
      <main className="container mx-auto px-4 md:px-6 lg:px-12 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight mb-2">
                Menu Management
              </h2>
              <p className="text-muted-foreground">
                Administra los platillos del menú
              </p>
            </div>
            <Button
              onClick={handleNewItem}
              className="flex items-center gap-2 bg-foreground text-background hover:bg-foreground/90"
            >
              <Plus weight="bold" className="h-5 w-5" />
              Nuevo Platillo
            </Button>
          </div>

          {/* Filter */}
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={filterCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterCategory('all')}
              size="sm"
            >
              Todos ({menuItems.length})
            </Button>
            {['entradas', 'bellarya-in-casa', 'pescados', 'pollo', 'salmon', 'pulpo', 'camarones', 'mejillones', 'pizzas', 'pastas', 'postres', 'bebidas', 'vinos'].map((cat) => {
              const count = menuItems.filter(item => item.categoria === cat).length;
              return (
                <Button
                  key={cat}
                  variant={filterCategory === cat ? 'default' : 'outline'}
                  onClick={() => setFilterCategory(cat as Categoria)}
                  size="sm"
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)} ({count})
                </Button>
              );
            })}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-muted-foreground">Cargando...</div>
          </div>
        ) : (
          <MenuTable
            items={filteredItems}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>

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
