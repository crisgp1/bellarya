'use client';

import { useState, useEffect } from 'react';
import { MenuItem, Categoria } from '@/types/menu';
import { X, FloppyDisk } from '@phosphor-icons/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { categorias, proteinasDisponibles } from '@/lib/menu-data';

interface MenuFormProps {
  item: MenuItem | null;
  onClose: () => void;
  onSave: () => void;
}

export function MenuForm({ item, onClose, onSave }: MenuFormProps) {
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    id: '',
    nombre: '',
    nombreEn: '',
    nombreItalia: '',
    nombreItaliaEn: '',
    categoria: 'entradas',
    subcategoria: '',
    subcategoriaEn: '',
    precio: 0,
    descripcion: '',
    descripcionEn: '',
    tiempoPrep: undefined,
    proteina: [],
    picante: false,
    destacado: false,
    alergenos: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData(item);
    }
  }, [item]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = item?._id ? `/api/menu/${item._id}` : '/api/menu';
      const method = item?._id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSave();
      } else {
        alert('Error al guardar el platillo');
      }
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Error al guardar el platillo');
    } finally {
      setLoading(false);
    }
  };

  const toggleProteina = (prot: string) => {
    setFormData(prev => ({
      ...prev,
      proteina: prev.proteina?.includes(prot)
        ? prev.proteina.filter(p => p !== prot)
        : [...(prev.proteina || []), prot]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background border-2 border-border max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b-2 border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">
            {item ? 'Editar Platillo' : 'Nuevo Platillo'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted transition-colors rounded-sm"
          >
            <X weight="bold" className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Información Básica */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold uppercase tracking-wider text-muted-foreground">
              Información Básica
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Nombre (Español) *
                </label>
                <Input
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="rounded-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Nombre (English)
                </label>
                <Input
                  value={formData.nombreEn || ''}
                  onChange={(e) => setFormData({ ...formData, nombreEn: e.target.value })}
                  className="rounded-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Nombre Italia (Español)
                </label>
                <Input
                  value={formData.nombreItalia || ''}
                  onChange={(e) => setFormData({ ...formData, nombreItalia: e.target.value })}
                  className="rounded-none italic"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Nombre Italia (English)
                </label>
                <Input
                  value={formData.nombreItaliaEn || ''}
                  onChange={(e) => setFormData({ ...formData, nombreItaliaEn: e.target.value })}
                  className="rounded-none italic"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Categoría *
                </label>
                <select
                  required
                  value={formData.categoria}
                  onChange={(e) => setFormData({ ...formData, categoria: e.target.value as Categoria })}
                  className="w-full h-10 px-3 border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
                >
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Subcategoría (Español)
                </label>
                <Input
                  value={formData.subcategoria || ''}
                  onChange={(e) => setFormData({ ...formData, subcategoria: e.target.value })}
                  className="rounded-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Subcategoría (English)
                </label>
                <Input
                  value={formData.subcategoriaEn || ''}
                  onChange={(e) => setFormData({ ...formData, subcategoriaEn: e.target.value })}
                  className="rounded-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Descripción (Español) *
                </label>
                <textarea
                  required
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  className="w-full min-h-[100px] px-3 py-2 border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Descripción (English)
                </label>
                <textarea
                  value={formData.descripcionEn || ''}
                  onChange={(e) => setFormData({ ...formData, descripcionEn: e.target.value })}
                  className="w-full min-h-[100px] px-3 py-2 border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
                  rows={4}
                />
              </div>
            </div>
          </div>

          {/* Detalles */}
          <div className="space-y-4 pt-6 border-t-2 border-border">
            <h3 className="text-lg font-semibold uppercase tracking-wider text-muted-foreground">
              Detalles
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Precio (MXN) *
                </label>
                <Input
                  required
                  type="number"
                  min="0"
                  step="1"
                  value={formData.precio}
                  onChange={(e) => setFormData({ ...formData, precio: Number(e.target.value) })}
                  className="rounded-none number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Tiempo de Preparación (min)
                </label>
                <Input
                  type="number"
                  min="0"
                  step="5"
                  value={formData.tiempoPrep || ''}
                  onChange={(e) => setFormData({ ...formData, tiempoPrep: e.target.value ? Number(e.target.value) : undefined })}
                  className="rounded-none number"
                />
              </div>
            </div>

            {/* Proteínas */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Proteínas
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {proteinasDisponibles.map((prot) => (
                  <button
                    key={prot}
                    type="button"
                    onClick={() => toggleProteina(prot)}
                    className={`px-4 py-2 text-sm border transition-colors ${
                      formData.proteina?.includes(prot)
                        ? 'bg-foreground text-background border-foreground'
                        : 'border-border hover:border-foreground/30'
                    }`}
                  >
                    {prot}
                  </button>
                ))}
              </div>
            </div>

            {/* Opciones */}
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.picante || false}
                  onChange={(e) => setFormData({ ...formData, picante: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">Picante</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.destacado || false}
                  onChange={(e) => setFormData({ ...formData, destacado: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">Destacado</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t-2 border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-foreground text-background hover:bg-foreground/90"
            >
              <FloppyDisk weight="bold" className="h-5 w-5" />
              {loading ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
