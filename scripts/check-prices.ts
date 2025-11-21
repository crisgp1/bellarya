import { config } from 'dotenv';
import { resolve } from 'path';
import mongoose from 'mongoose';

config({ path: resolve(process.cwd(), '.env.local') });

const menuItemSchema = new mongoose.Schema({}, { strict: false });
const MenuItem = mongoose.models.MenuItem || mongoose.model('MenuItem', menuItemSchema);

async function checkPrices() {
  try {
    console.log('Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Conectado!\n');

    // Get all items sorted by category and price
    const items = await MenuItem.find().sort({ categoria: 1, precio: 1 }).lean();

    console.log('PRECIOS EN BASE DE DATOS:\n');

    const categories = ['entradas', 'proteinas', 'pastas', 'pizzas', 'postres', 'bebidas', 'vinos'];

    for (const cat of categories) {
      const catItems = items.filter(i => i.categoria === cat);
      console.log(`\n=== ${cat.toUpperCase()} (${catItems.length} items) ===`);

      catItems.forEach(item => {
        console.log(`${item.id.padEnd(10)} | $${item.precio.toString().padEnd(6)} | ${item.nombre}`);
      });
    }

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

checkPrices();
