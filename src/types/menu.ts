export type Categoria = 'entradas' | 'pastas' | 'proteinas' | 'pizzas' | 'bebidas' | 'vinos' | 'postres';

export type Alergeno = 'gluten' | 'lacteos' | 'huevo' | 'pescado' | 'mariscos' | 'frutos-secos' | 'soja' | 'apio' | 'mostaza' | 'sesamo' | 'sulfitos';

export interface MenuItem {
  id: string;
  nombre: string;
  nombreItalia?: string;
  categoria: Categoria;
  subcategoria?: string;
  precio: number;
  descripcion: string;
  tiempoPrep?: number;
  proteina?: string[];
  picante?: boolean;
  destacado?: boolean;
  alergenos?: Alergeno[];
  // English translations
  nombreEn?: string;
  nombreItaliaEn?: string;
  descripcionEn?: string;
  subcategoriaEn?: string;
}

export interface FilterState {
  precioRango: 'todos' | 'bajo' | 'medio' | 'alto';
  proteina: string[];
  tiempoPrep: 'todos' | 'rapido' | 'medio' | 'largo';
  picante: boolean | null;
}
