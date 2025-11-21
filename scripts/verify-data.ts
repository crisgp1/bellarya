import { config } from 'dotenv';
import { resolve } from 'path';
import mongoose from 'mongoose';

config({ path: resolve(process.cwd(), '.env.local') });

const menuItemSchema = new mongoose.Schema({
  id: String,
  nombre: String,
  nombreEn: String,
  categoria: String,
  subcategoria: String,
  precio: Number,
  descripcion: String,
  descripcionEn: String,
});

const MenuItem = mongoose.models.MenuItem || mongoose.model('MenuItem', menuItemSchema);

async function verify() {
  try {
    console.log('Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('✅ MongoDB conectado\n');

    const total = await MenuItem.countDocuments();
    console.log(`📊 Total de items: ${total}\n`);

    // Count by category
    const categories = await MenuItem.aggregate([
      { $group: { _id: '$categoria', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    console.log('📋 Items por categoría:');
    categories.forEach(cat => {
      console.log(`   ${cat._id}: ${cat.count} items`);
    });

    // Sample some items
    console.log('\n🔍 Muestra de items:');
    const samples = await MenuItem.find().limit(3);
    samples.forEach(item => {
      console.log(`\n   ID: ${item.id}`);
      console.log(`   Nombre: ${item.nombre}`);
      console.log(`   Nombre EN: ${item.nombreEn || 'N/A'}`);
      console.log(`   Precio: $${item.precio}`);
      console.log(`   Descripción: ${item.descripcion.substring(0, 50)}...`);
    });

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

verify();
