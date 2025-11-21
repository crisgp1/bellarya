export type Categoria = string; // Dynamic categories - any string is allowed

export type Alergeno = 'gluten' | 'lacteos' | 'huevo' | 'pescado' | 'mariscos' | 'frutos-secos' | 'soja' | 'apio' | 'mostaza' | 'sesamo' | 'sulfitos';

export interface MenuItem {
  _id?: string; // MongoDB ID
  id?: string; // Optional custom ID
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
  // Seasonal fields
  temporada?: boolean;
  temporadaNombre?: string;
  temporadaInicio?: Date | string;
  temporadaFin?: Date | string;
  // Allergens
  alergenos?: Alergeno[];
  preparadoEnMesa?: boolean;
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
