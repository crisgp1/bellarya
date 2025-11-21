import mongoose from 'mongoose';
import MenuItem from '../src/models/MenuItem';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const wines = [
  // BLANCOS (White Wines)
  {
    id: 'vino-001',
    nombre: 'Roccaventosa',
    categoria: 'vinos' as const,
    subcategoria: 'Blancos',
    precio: 550,
    descripcion: 'Vino blanco',
    nombreEn: 'Roccaventosa',
    subcategoriaEn: 'White Wines',
    descripcionEn: 'White wine',
  },
  {
    id: 'vino-002',
    nombre: 'Pinot Grigio Terre de Abruzzo',
    categoria: 'vinos' as const,
    subcategoria: 'Blancos',
    precio: 140, // Copa
    descripcion: 'Italia',
    nombreEn: 'Pinot Grigio Terre de Abruzzo',
    subcategoriaEn: 'White Wines',
    descripcionEn: 'Italy',
  },
  {
    id: 'vino-003',
    nombre: 'Monte Xanic Viña Kristel',
    categoria: 'vinos' as const,
    subcategoria: 'Blancos',
    precio: 1200,
    descripcion: 'Sauvignon Blanc, México',
    nombreEn: 'Monte Xanic Viña Kristel',
    subcategoriaEn: 'White Wines',
    descripcionEn: 'Sauvignon Blanc, Mexico',
  },
  {
    id: 'vino-004',
    nombre: 'L.A. Cetto Fumé Blanc',
    categoria: 'vinos' as const,
    subcategoria: 'Blancos',
    precio: 520,
    descripcion: 'Sauvignon Blanc, México',
    nombreEn: 'L.A. Cetto Fumé Blanc',
    subcategoriaEn: 'White Wines',
    descripcionEn: 'Sauvignon Blanc, Mexico',
  },
  {
    id: 'vino-005',
    nombre: 'Santo Tomás L.B.',
    categoria: 'vinos' as const,
    subcategoria: 'Blancos',
    precio: 900,
    descripcion: 'Chenin Blanc, Colombard, México',
    nombreEn: 'Santo Tomás L.B.',
    subcategoriaEn: 'White Wines',
    descripcionEn: 'Chenin Blanc, Colombard, Mexico',
  },
  {
    id: 'vino-006',
    nombre: 'Paco y Lola',
    categoria: 'vinos' as const,
    subcategoria: 'Blancos',
    precio: 1600,
    descripcion: 'Albariño, España',
    nombreEn: 'Paco y Lola',
    subcategoriaEn: 'White Wines',
    descripcionEn: 'Albariño, Spain',
  },
  {
    id: 'vino-007',
    nombre: 'Porta G Vinho Verde',
    categoria: 'vinos' as const,
    subcategoria: 'Blancos',
    precio: 550,
    descripcion: 'Arinto de Bucelas, Loureiro, Trajadura, Portugal',
    nombreEn: 'Porta G Vinho Verde',
    subcategoriaEn: 'White Wines',
    descripcionEn: 'Arinto de Bucelas, Loureiro, Trajadura, Portugal',
  },
  {
    id: 'vino-008',
    nombre: 'Collevento 921, Prosecco',
    categoria: 'vinos' as const,
    subcategoria: 'Blancos',
    precio: 1500,
    descripcion: 'Cuvée, Italia',
    nombreEn: 'Collevento 921, Prosecco',
    subcategoriaEn: 'White Wines',
    descripcionEn: 'Cuvée, Italy',
  },

  // ROSADOS (Rosé Wines)
  {
    id: 'vino-009',
    nombre: 'Casa Madero V.',
    categoria: 'vinos' as const,
    subcategoria: 'Rosados',
    precio: 900,
    descripcion: 'Shiraz, México',
    nombreEn: 'Casa Madero V.',
    subcategoriaEn: 'Rosé Wines',
    descripcionEn: 'Shiraz, Mexico',
  },
  {
    id: 'vino-010',
    nombre: 'L.A. Cetto',
    categoria: 'vinos' as const,
    subcategoria: 'Rosados',
    precio: 500,
    descripcion: 'Zinfandel, México',
    nombreEn: 'L.A. Cetto',
    subcategoriaEn: 'Rosé Wines',
    descripcionEn: 'Zinfandel, Mexico',
  },
  {
    id: 'vino-011',
    nombre: 'Roccaventosa',
    categoria: 'vinos' as const,
    subcategoria: 'Rosados',
    precio: 750,
    descripcion: 'Vino rosado',
    nombreEn: 'Roccaventosa',
    subcategoriaEn: 'Rosé Wines',
    descripcionEn: 'Rosé wine',
  },
  {
    id: 'vino-012',
    nombre: 'Montepulciano, Cerasuolo D´Abruzzo',
    categoria: 'vinos' as const,
    subcategoria: 'Rosados',
    precio: 180, // Copa
    descripcion: 'Vino rosado - Copa $180',
    nombreEn: 'Montepulciano, Cerasuolo D´Abruzzo',
    subcategoriaEn: 'Rosé Wines',
    descripcionEn: 'Rosé wine - Glass $180',
  },
  {
    id: 'vino-013',
    nombre: 'Whispering Angel',
    categoria: 'vinos' as const,
    subcategoria: 'Rosados',
    precio: 1800,
    descripcion: 'Grenache, Cinsault, Vermentino, Francia',
    nombreEn: 'Whispering Angel',
    subcategoriaEn: 'Rosé Wines',
    descripcionEn: 'Grenache, Cinsault, Vermentino, France',
  },

  // TINTOS (Red Wines)
  {
    id: 'vino-014',
    nombre: 'Santo Tomás',
    categoria: 'vinos' as const,
    subcategoria: 'Tintos',
    precio: 700,
    descripcion: 'Merlot, México',
    nombreEn: 'Santo Tomás',
    subcategoriaEn: 'Red Wines',
    descripcionEn: 'Merlot, Mexico',
  },
  {
    id: 'vino-015',
    nombre: 'Santo Tomás',
    categoria: 'vinos' as const,
    subcategoria: 'Tintos',
    precio: 165, // Copa
    descripcion: 'Merlot, México',
    nombreEn: 'Santo Tomás',
    subcategoriaEn: 'Red Wines',
    descripcionEn: 'Merlot, Mexico',
  },
  {
    id: 'vino-016',
    nombre: 'Santo Tomás',
    categoria: 'vinos' as const,
    subcategoria: 'Tintos',
    precio: 700,
    descripcion: 'Cabernet Sauvignon, México',
    nombreEn: 'Santo Tomás',
    subcategoriaEn: 'Red Wines',
    descripcionEn: 'Cabernet Sauvignon, Mexico',
  },
  {
    id: 'vino-017',
    nombre: 'Santo Tomás 31.8',
    categoria: 'vinos' as const,
    subcategoria: 'Tintos',
    precio: 1200,
    descripcion: 'Tempranillo, Cabernet Sauvignon, Syrah, México',
    nombreEn: 'Santo Tomás 31.8',
    subcategoriaEn: 'Red Wines',
    descripcionEn: 'Tempranillo, Cabernet Sauvignon, Syrah, Mexico',
  },
  {
    id: 'vino-018',
    nombre: 'Santo Tomás',
    categoria: 'vinos' as const,
    subcategoria: 'Tintos',
    precio: 1100,
    descripcion: 'Tempranillo, Cabernet Sauvignon, México',
    nombreEn: 'Santo Tomás',
    subcategoriaEn: 'Red Wines',
    descripcionEn: 'Tempranillo, Cabernet Sauvignon, Mexico',
  },
  {
    id: 'vino-019',
    nombre: 'Monte Xanic Calixa',
    categoria: 'vinos' as const,
    subcategoria: 'Tintos',
    precio: 1200,
    descripcion: 'Tempranillo, Cabernet Sauvignon, México',
    nombreEn: 'Monte Xanic Calixa',
    subcategoriaEn: 'Red Wines',
    descripcionEn: 'Tempranillo, Cabernet Sauvignon, Mexico',
  },
  {
    id: 'vino-020',
    nombre: 'Monte Xanic Gran Ricardo',
    categoria: 'vinos' as const,
    subcategoria: 'Tintos',
    precio: 4500,
    descripcion: 'Cabernet Sauvignon, Merlot, Cabernet Franc, Petit Verdot, Malbec, México',
    nombreEn: 'Monte Xanic Gran Ricardo',
    subcategoriaEn: 'Red Wines',
    descripcionEn: 'Cabernet Sauvignon, Merlot, Cabernet Franc, Petit Verdot, Malbec, Mexico',
  },
  {
    id: 'vino-021',
    nombre: 'Casa Madero 3V',
    categoria: 'vinos' as const,
    subcategoria: 'Tintos',
    precio: 990,
    descripcion: 'Cabernet Sauvignon, Merlot, Tempranillo, México',
    nombreEn: 'Casa Madero 3V',
    subcategoriaEn: 'Red Wines',
    descripcionEn: 'Cabernet Sauvignon, Merlot, Tempranillo, Mexico',
  },
  {
    id: 'vino-022',
    nombre: 'Casa Madero 3V Gran Reserva',
    categoria: 'vinos' as const,
    subcategoria: 'Tintos',
    precio: 2300,
    descripcion: 'Cabernet Sauvignon, Shiraz, Cabernet Franc, México',
    nombreEn: 'Casa Madero 3V Gran Reserva',
    subcategoriaEn: 'Red Wines',
    descripcionEn: 'Cabernet Sauvignon, Shiraz, Cabernet Franc, Mexico',
  },
  {
    id: 'vino-023',
    nombre: 'L.A. Cetto',
    categoria: 'vinos' as const,
    subcategoria: 'Tintos',
    precio: 500,
    descripcion: 'Cabernet Sauvignon, México',
    nombreEn: 'L.A. Cetto',
    subcategoriaEn: 'Red Wines',
    descripcionEn: 'Cabernet Sauvignon, Mexico',
  },
  {
    id: 'vino-024',
    nombre: 'Predator',
    categoria: 'vinos' as const,
    subcategoria: 'Tintos',
    precio: 1100,
    descripcion: 'Zinfandel, Estados Unidos',
    nombreEn: 'Predator',
    subcategoriaEn: 'Red Wines',
    descripcionEn: 'Zinfandel, United States',
  },
  {
    id: 'vino-025',
    nombre: 'Caymus',
    categoria: 'vinos' as const,
    subcategoria: 'Tintos',
    precio: 5500,
    descripcion: 'Cabernet Sauvignon, EU',
    nombreEn: 'Caymus',
    subcategoriaEn: 'Red Wines',
    descripcionEn: 'Cabernet Sauvignon, US',
  },
  {
    id: 'vino-026',
    nombre: 'The Prisioner',
    categoria: 'vinos' as const,
    subcategoria: 'Tintos',
    precio: 3100,
    descripcion: 'Zinfandel, Cabernet Sauvignon, Petit Sirah, Syrah, Charbono, EU',
    nombreEn: 'The Prisioner',
    subcategoriaEn: 'Red Wines',
    descripcionEn: 'Zinfandel, Cabernet Sauvignon, Petit Sirah, Syrah, Charbono, US',
  },

  // ARGENTINOS Y OTROS (Argentinian and Other Wines)
  {
    id: 'vino-027',
    nombre: 'Terraza de los Andes',
    categoria: 'vinos' as const,
    subcategoria: 'Argentinos',
    precio: 900,
    descripcion: 'Vino argentino',
    nombreEn: 'Terraza de los Andes',
    subcategoriaEn: 'Argentinian and Others',
    descripcionEn: 'Argentinian wine',
  },
  {
    id: 'vino-028',
    nombre: 'Clós de los Siete',
    categoria: 'vinos' as const,
    subcategoria: 'Argentinos',
    precio: 240, // Copa
    descripcion: 'Vino argentino - Copa $240',
    nombreEn: 'Clós de los Siete',
    subcategoriaEn: 'Argentinian and Others',
    descripcionEn: 'Argentinian wine - Glass $240',
  },
  {
    id: 'vino-029',
    nombre: 'Punto Final',
    categoria: 'vinos' as const,
    subcategoria: 'Argentinos',
    precio: 2000,
    descripcion: 'Vino argentino',
    nombreEn: 'Punto Final',
    subcategoriaEn: 'Argentinian and Others',
    descripcionEn: 'Argentinian wine',
  },
  {
    id: 'vino-030',
    nombre: 'Finca Las Moras',
    categoria: 'vinos' as const,
    subcategoria: 'Argentinos',
    precio: 650,
    descripcion: 'Vino argentino',
    nombreEn: 'Finca Las Moras',
    subcategoriaEn: 'Argentinian and Others',
    descripcionEn: 'Argentinian wine',
  },
  {
    id: 'vino-031',
    nombre: 'Isla de Lobos',
    categoria: 'vinos' as const,
    subcategoria: 'Argentinos',
    precio: 500,
    descripcion: 'Vino argentino',
    nombreEn: 'Isla de Lobos',
    subcategoriaEn: 'Argentinian and Others',
    descripcionEn: 'Argentinian wine',
  },
  {
    id: 'vino-032',
    nombre: 'Tannat',
    categoria: 'vinos' as const,
    subcategoria: 'Argentinos',
    precio: 750,
    descripcion: 'Uruguay',
    nombreEn: 'Tannat',
    subcategoriaEn: 'Argentinian and Others',
    descripcionEn: 'Uruguay',
  },
  {
    id: 'vino-033',
    nombre: 'Emilio Moro',
    categoria: 'vinos' as const,
    subcategoria: 'Argentinos',
    precio: 1600,
    descripcion: 'Tempranillo, España',
    nombreEn: 'Emilio Moro',
    subcategoriaEn: 'Argentinian and Others',
    descripcionEn: 'Tempranillo, Spain',
  },
  {
    id: 'vino-034',
    nombre: 'Finca Resalso, Emilio Moro',
    categoria: 'vinos' as const,
    subcategoria: 'Argentinos',
    precio: 950,
    descripcion: 'Tempranillo, España',
    nombreEn: 'Finca Resalso, Emilio Moro',
    subcategoriaEn: 'Argentinian and Others',
    descripcionEn: 'Tempranillo, Spain',
  },
  {
    id: 'vino-035',
    nombre: 'Cal Y Canto',
    categoria: 'vinos' as const,
    subcategoria: 'Argentinos',
    precio: 500,
    descripcion: 'Tempranillo, Merlot, Syrah, España',
    nombreEn: 'Cal Y Canto',
    subcategoriaEn: 'Argentinian and Others',
    descripcionEn: 'Tempranillo, Merlot, Syrah, Spain',
  },
  {
    id: 'vino-036',
    nombre: 'Matarromera Oinoz',
    categoria: 'vinos' as const,
    subcategoria: 'Argentinos',
    precio: 1200,
    descripcion: 'Tempranillo, España',
    nombreEn: 'Matarromera Oinoz',
    subcategoriaEn: 'Argentinian and Others',
    descripcionEn: 'Tempranillo, Spain',
  },
  {
    id: 'vino-037',
    nombre: 'Malavida',
    categoria: 'vinos' as const,
    subcategoria: 'Argentinos',
    precio: 650,
    descripcion: 'Tempranillo, España',
    nombreEn: 'Malavida',
    subcategoriaEn: 'Argentinian and Others',
    descripcionEn: 'Tempranillo, Spain',
  },
  {
    id: 'vino-038',
    nombre: 'Porta G.',
    categoria: 'vinos' as const,
    subcategoria: 'Argentinos',
    precio: 550,
    descripcion: 'Aragonez, Castelao, Portugal',
    nombreEn: 'Porta G.',
    subcategoriaEn: 'Argentinian and Others',
    descripcionEn: 'Aragonez, Castelao, Portugal',
  },
  {
    id: 'vino-039',
    nombre: 'Roccaventosa',
    categoria: 'vinos' as const,
    subcategoria: 'Argentinos',
    precio: 600,
    descripcion: 'Cabernet Sauvignon, Italia',
    nombreEn: 'Roccaventosa',
    subcategoriaEn: 'Argentinian and Others',
    descripcionEn: 'Cabernet Sauvignon, Italy',
  },
  {
    id: 'vino-040',
    nombre: 'Colle Cavalieri',
    categoria: 'vinos' as const,
    subcategoria: 'Argentinos',
    precio: 150, // Copa
    descripcion: 'Vino italiano - Copa $150',
    nombreEn: 'Colle Cavalieri',
    subcategoriaEn: 'Argentinian and Others',
    descripcionEn: 'Italian wine - Glass $150',
  },
  {
    id: 'vino-041',
    nombre: 'Montepulciano D´Abruzzo',
    categoria: 'vinos' as const,
    subcategoria: 'Argentinos',
    precio: 850,
    descripcion: 'Italia',
    nombreEn: 'Montepulciano D´Abruzzo',
    subcategoriaEn: 'Argentinian and Others',
    descripcionEn: 'Italy',
  },
  {
    id: 'vino-042',
    nombre: 'Calù',
    categoria: 'vinos' as const,
    subcategoria: 'Argentinos',
    precio: 200, // Copa
    descripcion: 'Vino italiano - Copa $200',
    nombreEn: 'Calù',
    subcategoriaEn: 'Argentinian and Others',
    descripcionEn: 'Italian wine - Glass $200',
  },
  {
    id: 'vino-043',
    nombre: 'Nero D´Avola',
    categoria: 'vinos' as const,
    subcategoria: 'Argentinos',
    precio: 1000,
    descripcion: 'Italia',
    nombreEn: 'Nero D´Avola',
    subcategoriaEn: 'Argentinian and Others',
    descripcionEn: 'Italy',
  },
  {
    id: 'vino-044',
    nombre: 'Ruffino',
    categoria: 'vinos' as const,
    subcategoria: 'Argentinos',
    precio: 240, // Copa
    descripcion: 'Sangiovese, Italia - Copa $240',
    nombreEn: 'Ruffino',
    subcategoriaEn: 'Argentinian and Others',
    descripcionEn: 'Sangiovese, Italy - Glass $240',
  },
  {
    id: 'vino-045',
    nombre: 'Maria Tinto',
    categoria: 'vinos' as const,
    subcategoria: 'Argentinos',
    precio: 1000,
    descripcion: 'Sangiovese, Italia',
    nombreEn: 'Maria Tinto',
    subcategoriaEn: 'Argentinian and Others',
    descripcionEn: 'Sangiovese, Italy',
  },
  {
    id: 'vino-046',
    nombre: 'Barolo Ravera 2017',
    categoria: 'vinos' as const,
    subcategoria: 'Argentinos',
    precio: 1600,
    descripcion: 'Blen, México',
    nombreEn: 'Barolo Ravera 2017',
    subcategoriaEn: 'Argentinian and Others',
    descripcionEn: 'Blen, Mexico',
  },
  {
    id: 'vino-047',
    nombre: 'Barolo Ravera 2017',
    categoria: 'vinos' as const,
    subcategoria: 'Argentinos',
    precio: 3700,
    descripcion: 'Abrigo Giovanni',
    nombreEn: 'Barolo Ravera 2017',
    subcategoriaEn: 'Argentinian and Others',
    descripcionEn: 'Abrigo Giovanni',
  },
];

async function addWines() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI not found in environment variables');
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri, { dbName: 'bellarya' });
    console.log('Connected to MongoDB successfully to database: bellarya');

    console.log(`\nAdding ${wines.length} wines to database...`);

    // Delete existing wines to avoid duplicates
    const deleteResult = await MenuItem.deleteMany({ categoria: 'vinos' });
    console.log(`Deleted ${deleteResult.deletedCount} existing wine items`);

    // Insert all wines
    const result = await MenuItem.insertMany(wines);
    console.log(`\nSuccessfully added ${result.length} wines to database`);

    // Show summary by subcategory
    const summary = wines.reduce((acc, wine) => {
      const subcat = wine.subcategoria || 'Sin subcategoría';
      acc[subcat] = (acc[subcat] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    console.log('\nWines by subcategory:');
    Object.entries(summary).forEach(([subcat, count]) => {
      console.log(`  ${subcat}: ${count} wines`);
    });

    // Verify in database
    const totalWines = await MenuItem.countDocuments({ categoria: 'vinos' });
    console.log(`\nTotal wines in database: ${totalWines}`);

    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  } catch (error) {
    console.error('Error adding wines:', error);
    process.exit(1);
  }
}

addWines();
