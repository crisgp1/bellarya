import { config } from 'dotenv';
import { resolve } from 'path';
import mongoose from 'mongoose';

config({ path: resolve(process.cwd(), '.env.local') });

const menuItemSchema = new mongoose.Schema({}, { strict: false });
const MenuItem = mongoose.models.MenuItem || mongoose.model('MenuItem', menuItemSchema);

// Correcciones de precios basadas en el menu oficial
const priceCorrections: Record<string, number> = {
  // Vinos que necesitan corrección según el menú oficial
  'beb-091': 2000,  // Clos de los siete - estaba en $240 (copa), debe ser $2000 botella
  'beb-104': 240,   // Calù Nero D'Avola - estaba en $1000, debe ser $240 (copa según menú)
  'beb-105': 1000,  // Ruffino (Sangiovese) - estaba en $240 (copa), debe ser $1000 botella
};

async function fixPrices() {
  try {
    console.log('Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Conectado!\n');

    let updated = 0;

    for (const [id, correctPrice] of Object.entries(priceCorrections)) {
      const item = await MenuItem.findOne({ id });

      if (item) {
        const oldPrice = item.precio;
        if (oldPrice !== correctPrice) {
          await MenuItem.updateOne({ id }, { $set: { precio: correctPrice } });
          console.log(`${id} | ${item.nombre}`);
          console.log(`  Anterior: $${oldPrice} -> Nuevo: $${correctPrice}\n`);
          updated++;
        }
      }
    }

    console.log(`\nTotal items actualizados: ${updated}`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

fixPrices();
