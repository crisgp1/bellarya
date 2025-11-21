'use client';

import { MenuItem } from '@/types/menu';
import { Pencil, Trash, Clock, Fire, Star } from '@phosphor-icons/react';
import { Button } from './ui/button';

interface MenuGridProps {
  items: MenuItem[];
  onEdit: (item: MenuItem) => void;
  onDelete: (id: string) => void;
}

export function MenuGrid({ items, onEdit, onDelete }: MenuGridProps) {
  if (items.length === 0) {
    return (
      <div className="border-2 border-border p-8 md:p-12 text-center text-muted-foreground">
        No hay platillos en esta categoría
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {items.map((item) => (
        <div
          key={item._id?.toString() || item.id}
          className="group border-2 border-border bg-background hover:border-foreground/30 hover:shadow-lg transition-all duration-300 flex flex-col"
        >
          {/* Header */}
          <div className="p-4 border-b border-border/50">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base md:text-lg truncate">{item.nombre}</h3>
                {item.nombreItalia && (
                  <p className="text-xs md:text-sm text-muted-foreground italic truncate mt-0.5">
                    {item.nombreItalia}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(item)}
                  className="h-8 w-8 p-0 hover:bg-muted opacity-0 group-hover:opacity-100 transition-opacity"
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
                  className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Eliminar"
                >
                  <Trash weight="bold" className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3 flex-1 flex flex-col">
            {/* Price & Category */}
            <div className="flex items-center justify-between gap-2">
              <span className="number text-xl md:text-2xl font-bold">${item.precio}</span>
              <span className="inline-flex items-center px-2 py-1 text-[10px] md:text-xs font-medium bg-muted rounded truncate max-w-[120px]">
                {item.categoria}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs md:text-sm text-muted-foreground line-clamp-3 flex-1">
              {item.descripcion}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/50">
              {item.tiempoPrep && (
                <div className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock weight="bold" className="h-3.5 w-3.5" />
                  <span className="number">{item.tiempoPrep} min</span>
                </div>
              )}
              {item.picante && (
                <div className="inline-flex items-center gap-1 text-xs text-orange-600">
                  <Fire weight="fill" className="h-3.5 w-3.5" />
                  <span>Picante</span>
                </div>
              )}
              {item.destacado && (
                <div className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-foreground text-background rounded">
                  <Star weight="fill" className="h-3 w-3" />
                  <span>Destacado</span>
                </div>
              )}
            </div>

            {/* Proteins */}
            {item.proteina && item.proteina.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {item.proteina.slice(0, 3).map((prot) => (
                  <span
                    key={prot}
                    className="inline-flex items-center px-2 py-0.5 text-[10px] md:text-xs border border-border rounded"
                  >
                    {prot}
                  </span>
                ))}
                {item.proteina.length > 3 && (
                  <span className="inline-flex items-center px-2 py-0.5 text-[10px] md:text-xs text-muted-foreground">
                    +{item.proteina.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
