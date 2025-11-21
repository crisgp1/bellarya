import { config } from 'dotenv';
import { resolve } from 'path';
import mongoose from 'mongoose';

config({ path: resolve(process.cwd(), '.env.local') });

const menuItemSchema = new mongoose.Schema({}, { strict: false });
const MenuItem = mongoose.models.MenuItem || mongoose.model('MenuItem', menuItemSchema);

const allergenMap: Record<string, string[]> = {
  'ent-001': ['gluten', 'lacteos'],
  'ent-002': [],
  'ent-003': ['lacteos'],
  'ent-004': ['lacteos'],
  'ent-005': ['pescado'],
  'ent-006': ['gluten', 'lacteos', 'huevo'],
  'ent-007': [],
  'ent-008': ['pescado'],
  'ent-009': ['gluten'],
  'ent-010': ['lacteos'],
  'ent-011': ['pescado'],
  'ent-012': ['gluten', 'lacteos'],
  'ent-013': ['gluten', 'lacteos', 'huevo', 'mostaza'],
  'ent-014': ['lacteos'],
  'ent-015': ['pescado'],
  'ent-016': ['mariscos', 'gluten', 'lacteos'],
  'ent-017': ['mariscos', 'gluten', 'lacteos', 'huevo'],
  'ent-018': ['lacteos'],
  'ent-019': ['gluten'],
  'ent-020': ['apio', 'gluten'],
  'ent-021': ['lacteos'],
  'ent-022': ['mariscos', 'lacteos'],
  'ent-023': ['huevo', 'pescado', 'lacteos', 'gluten'],
  'ent-024': ['lacteos'],
  'ent-025': ['frutos-secos', 'lacteos'],
  'ent-026': ['mariscos'],
  'ent-027': ['lacteos'],
  'pro-001': ['gluten', 'lacteos', 'huevo'],
  'pro-002': ['gluten', 'lacteos', 'huevo', 'mariscos'],
  'pro-003': ['lacteos'],
  'pro-004': [],
  'pro-005': [],
  'pro-006': ['mariscos'],
  'pro-007': [],
  'pro-008': ['mariscos'],
  'pro-009': ['pescado'],
  'pro-010': ['pescado', 'lacteos'],
  'pro-011': ['pescado'],
  'pro-012': ['pescado', 'lacteos'],
  'pro-013': ['pescado'],
  'pro-014': ['lacteos'],
  'pro-015': ['gluten', 'lacteos', 'huevo'],
  'pro-016': [],
  'pro-017': ['lacteos'],
  'pro-018': ['pescado', 'lacteos'],
  'pro-019': ['pescado'],
  'pro-020': ['pescado', 'lacteos'],
  'pro-021': ['pescado'],
  'pro-022': ['mariscos'],
  'pro-023': ['mariscos'],
  'pro-024': ['mariscos', 'sulfitos'],
  'pro-025': ['mariscos', 'pescado'],
  'pro-026': ['mariscos'],
  'pro-027': ['mariscos', 'lacteos'],
  'pro-028': ['mariscos', 'huevo'],
  'pro-029': ['mariscos'],
  'pro-030': ['mariscos', 'lacteos'],
  'pro-031': ['mariscos', 'gluten', 'lacteos'],
  'pro-032': ['mariscos', 'mostaza'],
  'pro-033': ['mariscos', 'lacteos', 'sulfitos'],
  'pro-034': ['mariscos', 'lacteos'],
  'piz-001': ['gluten', 'lacteos'],
  'piz-002': ['gluten', 'lacteos'],
  'piz-003': ['gluten', 'lacteos'],
  'piz-004': ['gluten', 'lacteos'],
  'piz-005': ['gluten', 'lacteos'],
  'piz-006': ['gluten', 'lacteos', 'mariscos'],
  'piz-007': ['gluten', 'lacteos', 'mariscos', 'pescado'],
  'piz-008': ['gluten', 'lacteos'],
  'pas-001': ['gluten', 'lacteos'],
  'pas-002': ['gluten'],
  'pas-003': ['gluten', 'lacteos'],
  'pas-004': ['gluten'],
  'pas-005': ['gluten'],
  'pas-006': ['gluten', 'lacteos', 'frutos-secos'],
  'pas-007': ['gluten', 'lacteos', 'huevo'],
  'pas-008': ['gluten', 'lacteos'],
  'pas-009': ['gluten', 'lacteos'],
  'pas-010': ['gluten', 'lacteos', 'pescado'],
  'pas-011': ['gluten', 'mariscos'],
  'pas-012': ['gluten', 'lacteos'],
  'pas-013': ['gluten', 'lacteos'],
  'pos-001': ['gluten', 'lacteos', 'huevo'],
  'pos-002': ['gluten', 'lacteos', 'huevo'],
  'pos-003': ['gluten', 'lacteos', 'huevo'],
  'pos-004': ['gluten', 'lacteos', 'huevo', 'frutos-secos'],
  'pos-005': ['lacteos'],
  'beb-001': ['gluten'], 'beb-002': ['gluten'], 'beb-003': ['gluten'],
  'beb-004': ['gluten'], 'beb-005': ['gluten'], 'beb-006': ['gluten'],
  'beb-007': ['gluten'], 'beb-008': ['gluten'], 'beb-009': ['gluten'],
  'beb-010': ['gluten'], 'beb-011': ['gluten'], 'beb-012': ['gluten'],
  'beb-013': ['gluten'], 'beb-014': ['gluten'], 'beb-015': ['gluten'],
  'beb-016': ['gluten'], 'beb-017': ['gluten'], 'beb-018': ['gluten'],
  'beb-019': ['gluten'], 'beb-020': ['gluten'], 'beb-021': ['gluten'],
  'beb-022': ['gluten'], 'beb-023': ['gluten'], 'beb-024': ['gluten'],
  'beb-025': ['gluten'],
  'beb-040': ['lacteos'], 'beb-041': ['lacteos'], 'beb-042': ['lacteos'],
  'beb-045': ['lacteos'], 'beb-046': ['lacteos'],
  'beb-053': ['sulfitos'], 'beb-054': ['sulfitos'], 'beb-055': ['sulfitos'],
  'beb-056': ['sulfitos'], 'beb-057': ['sulfitos'], 'beb-058': ['sulfitos'],
  'beb-059': ['sulfitos'], 'beb-060': ['sulfitos'], 'beb-061': ['sulfitos'],
  'beb-062': ['sulfitos'], 'beb-063': ['sulfitos'], 'beb-065': ['sulfitos'],
  'beb-066': ['sulfitos'], 'beb-067': ['sulfitos'], 'beb-068': ['sulfitos'],
  'beb-069': ['sulfitos'], 'beb-070': ['sulfitos'], 'beb-071': ['sulfitos'],
  'beb-072': ['sulfitos'], 'beb-073': ['sulfitos'], 'beb-074': ['sulfitos'],
  'beb-075': ['sulfitos'], 'beb-076': ['sulfitos'], 'beb-077': ['sulfitos'],
  'beb-078': ['sulfitos'], 'beb-079': ['sulfitos'], 'beb-080': ['sulfitos'],
  'beb-081': ['sulfitos'], 'beb-082': ['sulfitos'], 'beb-083': ['sulfitos'],
  'beb-084': ['sulfitos'], 'beb-085': ['sulfitos'], 'beb-086': ['sulfitos'],
  'beb-087': ['sulfitos'], 'beb-088': ['sulfitos'], 'beb-089': ['sulfitos'],
  'beb-090': ['sulfitos'], 'beb-091': ['sulfitos'], 'beb-092': ['sulfitos'],
  'beb-093': ['sulfitos'], 'beb-094': ['sulfitos'], 'beb-095': ['sulfitos'],
  'beb-096': ['sulfitos'], 'beb-097': ['sulfitos'], 'beb-098': ['sulfitos'],
  'beb-099': ['sulfitos'], 'beb-100': ['sulfitos'], 'beb-101': ['sulfitos'],
  'beb-102': ['sulfitos'], 'beb-103': ['sulfitos'], 'beb-104': ['sulfitos'],
  'beb-105': ['sulfitos'], 'beb-106': ['sulfitos'], 'beb-107': ['sulfitos'],
  'beb-108': ['sulfitos'],
};

async function addAllergens() {
  try {
    console.log('Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Conectado!\n');

    let updated = 0;
    for (const [id, allergens] of Object.entries(allergenMap)) {
      const result = await MenuItem.updateOne(
        { id },
        { $set: { alergenos: allergens } }
      );
      if (result.modifiedCount > 0) {
        updated++;
      }
    }

    console.log('Actualizados', updated, 'items con alergenos');

    const withAllergens = await MenuItem.countDocuments({
      alergenos: { $exists: true, $ne: [] }
    });
    console.log('Items con alergenos:', withAllergens);

    const sample = await MenuItem.findOne({ id: 'ent-008' }).lean();
    console.log('\nMuestra (Carpaccio de Atun):');
    console.log('Alergenos:', sample.alergenos?.join(', ') || 'ninguno');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

addAllergens();
