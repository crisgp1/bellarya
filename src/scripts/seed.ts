import { config } from 'dotenv';
import { resolve } from 'path';
import mongoose from 'mongoose';

// Load .env.local file BEFORE any other imports
config({ path: resolve(process.cwd(), '.env.local') });

// Verify MONGODB_URI is loaded
if (!process.env.MONGODB_URI) {
  console.error('❌ Error: MONGODB_URI no está definida en .env.local');
  process.exit(1);
}

// Import after env is loaded
import { menuItemsReal } from '../lib/menu-data-real';

// Define schema inline to avoid circular dependencies
const menuItemSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    nombre: { type: String, required: true, index: true },
    nombreItalia: { type: String },
    categoria: {
      type: String,
      required: true,
      enum: ['entradas', 'pastas', 'proteinas', 'pizzas', 'bebidas', 'vinos', 'postres'],
      index: true,
    },
    subcategoria: { type: String },
    precio: { type: Number, required: true, min: 0 },
    descripcion: { type: String, required: true },
    tiempoPrep: { type: Number, min: 0 },
    proteina: { type: [String] },
    picante: { type: Boolean, default: false },
    destacado: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const MenuItem = mongoose.models.MenuItem || mongoose.model('MenuItem', menuItemSchema);

async function seed() {
  try {
    console.log('Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('✅ MongoDB conectado');

    console.log('Limpiando datos existentes...');
    await MenuItem.deleteMany({});

    console.log('Insertando datos del menú...');
    await MenuItem.insertMany(menuItemsReal);

    console.log(`✓ Se insertaron ${menuItemsReal.length} items al menú`);
    console.log('Seed completado exitosamente');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error en seed:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

seed();
