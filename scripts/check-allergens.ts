import { config } from 'dotenv';
import { resolve } from 'path';
import mongoose from 'mongoose';

config({ path: resolve(process.cwd(), '.env.local') });

const menuItemSchema = new mongoose.Schema({}, { strict: false });
const MenuItem = mongoose.models.MenuItem || mongoose.model('MenuItem', menuItemSchema);

async function checkAllergens() {
  try {
    console.log('Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('✅ MongoDB conectado\n');

    // Get one item with all fields
    const sample = await MenuItem.findOne({ id: 'ent-008' }).lean();
    console.log('🔍 Item de muestra (ent-008 - Carpaccio de Atún):');
    console.log(JSON.stringify(sample, null, 2));

    console.log('\n📋 Campos disponibles:');
    console.log(Object.keys(sample).join(', '));

    // Check if any items have allergens
    const withAllergens = await MenuItem.countDocuments({ alergenos: { $exists: true, $ne: [] } });
    console.log(`\n🔢 Items con alergenos: ${withAllergens}`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

checkAllergens();
