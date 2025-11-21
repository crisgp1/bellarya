import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import MenuItem from '@/models/MenuItem';

// Type for MenuItem document
interface MenuItemDoc {
  _id: unknown;
  id: string;
  nombre: string;
  nombreEn?: string;
  nombreItalia?: string;
  nombreItaliaEn?: string;
  descripcion?: string;
  descripcionEn?: string;
  subcategoria?: string;
  subcategoriaEn?: string;
  categoria: string;
  precio: number;
  proteina?: string[];
  picante?: boolean;
  alergenos?: string[];
  imagen?: string;
  disponible?: boolean;
}

// Whitelist of allowed categories
const ALLOWED_CATEGORIES = [
  'entradas',
  'bellarya-in-casa',
  'pescados',
  'pollo',
  'salmon',
  'pulpo',
  'camarones',
  'mejillones',
  'pizzas',
  'pastas',
  'postres',
  'bebidas',
  'vinos'
];
const ALLOWED_LANGUAGES = ['es', 'en'];

// Sanitize and validate query parameters
function sanitizeQueryParam(param: string | null, allowedValues?: string[]): string | null {
  if (!param) return null;

  // Basic sanitization - remove any MongoDB operators
  const sanitized = param.replace(/[\$\{\}]/g, '');

  if (allowedValues && !allowedValues.includes(sanitized)) {
    return null;
  }

  return sanitized;
}

function sanitizeNumber(param: string | null, min: number = 0, max: number = 100000): number | null {
  if (!param) return null;

  const num = Number(param);

  if (isNaN(num) || num < min || num > max) {
    return null;
  }

  return num;
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;

    // Sanitize all inputs
    const categoria = sanitizeQueryParam(searchParams.get('categoria'), ALLOWED_CATEGORIES);
    const search = sanitizeQueryParam(searchParams.get('search'));
    const precioMin = sanitizeNumber(searchParams.get('precioMin'));
    const precioMax = sanitizeNumber(searchParams.get('precioMax'));
    const proteina = sanitizeQueryParam(searchParams.get('proteina'));
    const picanteParam = searchParams.get('picante');
    const lang = sanitizeQueryParam(searchParams.get('lang'), ALLOWED_LANGUAGES) || 'es';

    // Build query with proper types
    const query: Record<string, unknown> = {};

    if (categoria) {
      query.categoria = categoria;
    }

    if (search && search.length > 0 && search.length < 100) {
      // Safe text search - MongoDB $text is injection-safe when used with strings
      query.$text = { $search: search };
    }

    if (precioMin !== null || precioMax !== null) {
      query.precio = {};
      if (precioMin !== null) (query.precio as Record<string, number>).$gte = precioMin;
      if (precioMax !== null) (query.precio as Record<string, number>).$lte = precioMax;
    }

    if (proteina && proteina.length > 0) {
      const proteinasArray = proteina.split(',').map(p => p.trim()).filter(p => p.length > 0);
      if (proteinasArray.length > 0 && proteinasArray.length <= 10) {
        query.proteina = { $in: proteinasArray };
      }
    }

    if (picanteParam !== null && picanteParam !== undefined) {
      query.picante = picanteParam === 'true';
    }

    const items = await MenuItem.find(query)
      .sort({ categoria: 1, precio: 1 })
      .limit(1000) // Prevent excessive data return
      .lean<MenuItemDoc[]>();

    // Transform items based on language
    const transformedItems = items.map((item) => {
      if (lang === 'en') {
        return {
          ...item,
          nombre: item.nombreEn || item.nombre,
          nombreItalia: item.nombreItaliaEn || item.nombreItalia,
          descripcion: item.descripcionEn || item.descripcion,
          subcategoria: item.subcategoriaEn || item.subcategoria,
        };
      }
      return item;
    });

    return NextResponse.json({ success: true, data: transformedItems });
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener el menú' },
      { status: 500 }
    );
  }
}

// POST endpoint removed for security
// Use dedicated admin API with authentication for menu modifications
// export async function POST(request: NextRequest) { ... }
