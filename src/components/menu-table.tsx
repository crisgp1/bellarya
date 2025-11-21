'use client';

import { MenuItem } from '@/types/menu';
import { Pencil, Trash } from '@phosphor-icons/react';
import { Button } from './ui/button';

interface MenuTableProps {
  items: MenuItem[];
  onEdit: (item: MenuItem) => void;
  onDelete: (id: string) => void;
}

export function MenuTable({ items, onEdit, onDelete }: MenuTableProps) {
  if (items.length === 0) {
    return (
      <div className="border-2 border-border p-8 md:p-12 text-center text-muted-foreground">
        No hay platillos en esta categoría
      </div>
    );
  }

  return (
    <div className="border-2 border-border overflow-hidden rounded-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-muted/50 border-b-2 border-border">
            <tr>
              <th className="px-3 md:px-4 py-3 text-left text-[10px] md:text-xs font-semibold uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-3 md:px-4 py-3 text-left text-[10px] md:text-xs font-semibold uppercase tracking-wider hidden lg:table-cell">
                Categoría
              </th>
              <th className="px-3 md:px-4 py-3 text-left text-[10px] md:text-xs font-semibold uppercase tracking-wider">
                Precio
              </th>
              <th className="px-3 md:px-4 py-3 text-left text-[10px] md:text-xs font-semibold uppercase tracking-wider hidden md:table-cell">
                Descripción
              </th>
              <th className="px-3 md:px-4 py-3 text-right text-[10px] md:text-xs font-semibold uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((item) => (
              <tr key={item._id?.toString() || item.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-3 md:px-4 py-3">
                  <div>
                    <div className="font-medium text-sm md:text-base">{item.nombre}</div>
                    {item.nombreItalia && (
                      <div className="text-xs md:text-sm text-muted-foreground italic">
                        {item.nombreItalia}
                      </div>
                    )}
                    {/* Show category on mobile */}
                    <div className="lg:hidden mt-1">
                      <span className="inline-block px-2 py-0.5 text-[10px] font-medium bg-muted rounded">
                        {item.categoria}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-3 md:px-4 py-3 hidden lg:table-cell">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-muted rounded capitalize">
                    {item.categoria.replace('-', ' ')}
                  </span>
                </td>
                <td className="px-3 md:px-4 py-3">
                  <span className="number font-semibold text-sm md:text-base">${item.precio}</span>
                </td>
                <td className="px-3 md:px-4 py-3 hidden md:table-cell">
                  <div className="max-w-md text-xs md:text-sm text-muted-foreground line-clamp-2">
                    {item.descripcion}
                  </div>
                </td>
                <td className="px-3 md:px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1 md:gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(item)}
                      className="hover:bg-muted h-8 w-8 p-0"
                      title="Editar"
                    >
                      <Pencil weight="bold" className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const id = item._id?.toString() || item.id;
                        if (id) onDelete(id);
                      }}
                      className="hover:bg-destructive/10 hover:text-destructive h-8 w-8 p-0"
                      title="Eliminar"
                    >
                      <Trash weight="bold" className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
