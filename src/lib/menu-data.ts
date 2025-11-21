// Menu configuration and constants
// Note: Menu items are now stored in MongoDB, not in this file

export const categorias = [
  { id: 'entradas', label: 'Entradas', labelEn: 'Appetizers' },
  { id: 'bellarya-in-casa', label: 'Bellarya In Casa', labelEn: 'Bellarya In Casa' },
  { id: 'pescados', label: 'Pescados', labelEn: 'Fish' },
  { id: 'pollo', label: 'Pollo', labelEn: 'Chicken' },
  { id: 'salmon', label: 'Salmón', labelEn: 'Salmon' },
  { id: 'pulpo', label: 'Pulpo', labelEn: 'Octopus' },
  { id: 'camarones', label: 'Camarones', labelEn: 'Shrimp' },
  { id: 'mejillones', label: 'Mejillones', labelEn: 'Mussels' },
  { id: 'pizzas', label: 'Pizzas', labelEn: 'Pizzas' },
  { id: 'pastas', label: 'Pastas', labelEn: 'Pastas' },
  { id: 'postres', label: 'Postres', labelEn: 'Desserts' },
  { id: 'bebidas', label: 'Bebidas', labelEn: 'Drinks' },
  { id: 'vinos', label: 'Vinos', labelEn: 'Wines' },
] as const;

export const proteinasDisponibles = [
  'res',
  'cerdo',
  'pollo',
  'pescado',
  'mariscos',
  'cordero',
] as const;
