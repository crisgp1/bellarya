import { config } from 'dotenv';
import { resolve } from 'path';
import mongoose from 'mongoose';

config({ path: resolve(process.cwd(), '.env.local') });

const menuItemSchema = new mongoose.Schema({}, { strict: false });
const MenuItem = mongoose.models.MenuItem || mongoose.model('MenuItem', menuItemSchema);

// Precios correctos del menú oficial de Bellarya 2025
const correctPrices: Record<string, number> = {
  // ENTRADAS - todos correctos
  'ent-001': 100, 'ent-002': 120, 'ent-003': 130, 'ent-004': 140,
  'ent-005': 160, 'ent-006': 170, 'ent-007': 170, 'ent-008': 180,
  'ent-009': 180, 'ent-010': 180, 'ent-011': 180, 'ent-012': 180,
  'ent-013': 200, 'ent-014': 210, 'ent-015': 210, 'ent-016': 230,
  'ent-017': 240, 'ent-018': 310, 'ent-019': 315,

  // SOPAS
  'ent-020': 140, 'ent-021': 140, 'ent-022': 190,

  // ENSALADAS
  'ent-023': 155, 'ent-024': 160, 'ent-025': 170, 'ent-026': 240, 'ent-027': 280,

  // PROTEINAS - BELLARYA IN CASA
  'pro-001': 180, 'pro-002': 200, 'pro-003': 320, 'pro-004': 360, 'pro-005': 520,
  'pro-006': 900, 'pro-007': 1100, 'pro-008': 2100,

  // PESCADOS
  'pro-009': 300, 'pro-010': 300, 'pro-011': 310, 'pro-012': 320, 'pro-013': 600,

  // POLLO
  'pro-014': 230, 'pro-015': 230, 'pro-016': 230, 'pro-017': 240,

  // SALMÓN
  'pro-018': 280, 'pro-019': 280, 'pro-020': 280, 'pro-021': 290,

  // PULPO
  'pro-022': 300, 'pro-023': 300, 'pro-024': 300, 'pro-025': 310,

  // CAMARONES
  'pro-026': 270, 'pro-027': 270, 'pro-028': 270, 'pro-029': 280,
  'pro-030': 280, 'pro-031': 290, 'pro-032': 350,

  // MEJILLONES
  'pro-033': 240, 'pro-034': 240,

  // PIZZAS
  'piz-001': 160, 'piz-002': 180, 'piz-003': 180, 'piz-004': 199,
  'piz-005': 225, 'piz-006': 250, 'piz-007': 250, 'piz-008': 250,

  // PASTAS TRADICIONALES
  'pas-001': 120, 'pas-002': 140, 'pas-003': 150, 'pas-004': 155,
  'pas-005': 155, 'pas-006': 155, 'pas-007': 155, 'pas-008': 160,

  // BELLARYA SPECIALE
  'pas-009': 199, 'pas-010': 270, 'pas-011': 280, 'pas-012': 360, 'pas-013': 360,

  // POSTRES
  'pos-001': 150, 'pos-002': 160, 'pos-003': 160, 'pos-004': 160, 'pos-005': 60,

  // BEBIDAS - CERVEZA
  'beb-001': 50, 'beb-002': 50, 'beb-003': 50, 'beb-004': 60, 'beb-005': 60,
  'beb-006': 65, 'beb-007': 65, 'beb-008': 65, 'beb-009': 75,
  'beb-010': 40, 'beb-011': 40, 'beb-012': 40, 'beb-013': 55,
  'beb-014': 60, 'beb-015': 60, 'beb-016': 60, 'beb-017': 35,

  // CERVEZA ARTESANAL
  'beb-018': 90, 'beb-019': 90, 'beb-020': 90, 'beb-021': 90, 'beb-022': 90,
  'beb-023': 90, 'beb-024': 90, 'beb-025': 90,

  // REFRESCOS
  'beb-026': 38, 'beb-027': 38, 'beb-028': 38, 'beb-029': 38, 'beb-030': 38,
  'beb-031': 38, 'beb-032': 38, 'beb-033': 65, 'beb-034': 90,
  'beb-035': 50, 'beb-036': 50,

  // CAFÉ
  'beb-037': 45, 'beb-038': 50, 'beb-039': 80, 'beb-040': 85, 'beb-041': 85,
  'beb-042': 100, 'beb-043': 180, 'beb-044': 180, 'beb-045': 80, 'beb-046': 100,

  // MOCTELERÍA
  'beb-047': 90, 'beb-048': 90, 'beb-049': 90,

  // SODAS ITALIANAS
  'beb-050': 75, 'beb-051': 75, 'beb-052': 75,

  // COCTELERÍA
  'beb-053': 120, 'beb-054': 120, 'beb-055': 140, 'beb-056': 160, 'beb-057': 120,
  'beb-058': 180, 'beb-059': 200, 'beb-060': 140, 'beb-061': 160,
  'beb-062': 170, 'beb-063': 170, 'beb-064': 170, 'beb-065': 95,

  // VINOS BLANCOS (BOTELLAS)
  'beb-066': 550,   // Roccaventosa
  'beb-067': 140,   // Pinot Grigio (COPA)
  'beb-068': 1200,  // Monte Xanic Viña Kristel
  'beb-069': 520,   // LA Cetto Fumé Blanc
  'beb-070': 900,   // Santo Tomas 1.B.
  'beb-071': 1600,  // Pan y Lola
  'beb-072': 550,   // Porta G Vinho Verde
  'beb-073': 1500,  // Collevento 921 Prosecco

  // VINOS ROSADOS (BOTELLAS)
  'beb-074': 900,   // Casa Madero V.
  'beb-075': 500,   // LA Cetto
  'beb-076': 750,   // Roccaventosa Montepulciano (botella) - NOTA: Copa $180
  'beb-077': 1800,  // Whispering Angel

  // VINOS TINTOS (BOTELLAS)
  'beb-078': 700,   // Santo Tomas Cabernet Sauvignon
  'beb-079': 700,   // Santo Tomas Merlot - NOTA: Copa $165
  'beb-080': 1200,  // Santo Tomas 31.8
  'beb-081': 1100,  // Santo Tomas Tempranillo
  'beb-082': 1200,  // Monte Xanic Calixa
  'beb-083': 4500,  // Monte Xanic Gran Ricardo
  'beb-084': 990,   // Casa Madero 3V
  'beb-085': 2300,  // Casa Madero 3V Gran Reserva
  'beb-086': 500,   // LA Cetto Cabernet Sauvignon
  'beb-087': 1100,  // Predator
  'beb-088': 5500,  // Caymus
  'beb-089': 3100,  // The Prisoner

  // ARGENTINOS/INTERNACIONALES
  'beb-090': 900,   // Terraza de los Andes
  'beb-091': 2000,  // Clós de los siete - NOTA: Copa $240
  'beb-092': 2000,  // Pulpo Final
  'beb-093': 650,   // Finca Las Moras
  'beb-094': 500,   // Isla de Lobos
  'beb-095': 750,   // Tannat Uruguay
  'beb-096': 1600,  // Emilio Moro
  'beb-097': 950,   // Finca Resalso Emilio Moro
  'beb-098': 500,   // Cal y Canto
  'beb-099': 1200,  // Matarromera Óñoz
  'beb-100': 650,   // Malavida
  'beb-101': 550,   // Porta G
  'beb-102': 600,   // Roccaventosa Cabernet Sauvignon - NOTA: Copa $150
  'beb-103': 850,   // Colle Cavalieri Montepulciano - NOTA: Copa $150
  'beb-104': 1000,  // Calù Nero D'Avola - NOTA: Copa $200
  'beb-105': 1000,  // Ruffino Sangiovese - NOTA: Copa $240
  'beb-106': 1000,  // Maria Tinto
  'beb-107': 1600,  // Barolo Ravera 2017
  'beb-108': 3700,  // Barolo Ravera 2017 Reserva - NOTA: Copa $500
};

async function validatePrices() {
  try {
    console.log('Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Conectado!\n');

    const items = await MenuItem.find().sort({ id: 1 }).lean();

    let errors = 0;
    const toUpdate: Array<{id: string, nombre: string, oldPrice: number, newPrice: number}> = [];

    console.log('=== VALIDACIÓN DE PRECIOS ===\n');

    for (const item of items) {
      const correctPrice = correctPrices[item.id];

      if (correctPrice === undefined) {
        console.log(`⚠️  ${item.id} - No tiene precio definido en el menú oficial`);
        errors++;
        continue;
      }

      if (item.precio !== correctPrice) {
        toUpdate.push({
          id: item.id,
          nombre: item.nombre,
          oldPrice: item.precio,
          newPrice: correctPrice
        });
      }
    }

    if (toUpdate.length > 0) {
      console.log(`❌ ENCONTRADOS ${toUpdate.length} PRECIOS INCORRECTOS:\n`);

      toUpdate.forEach(item => {
        console.log(`${item.id} | ${item.nombre}`);
        console.log(`  DB: $${item.oldPrice} -> Correcto: $${item.newPrice}\n`);
      });

      console.log('\n¿Deseas actualizar estos precios? El script aplicará las correcciones...\n');
    } else {
      console.log('✅ Todos los precios están correctos!\n');
    }

    console.log(`\nResumen:`);
    console.log(`- Items revisados: ${items.length}`);
    console.log(`- Items correctos: ${items.length - toUpdate.length}`);
    console.log(`- Items a corregir: ${toUpdate.length}`);
    console.log(`- Errores: ${errors}`);

    // Aplicar correcciones
    if (toUpdate.length > 0) {
      console.log('\n=== APLICANDO CORRECCIONES ===\n');

      for (const item of toUpdate) {
        await MenuItem.updateOne(
          { id: item.id },
          { $set: { precio: item.newPrice } }
        );
        console.log(`✓ ${item.id} actualizado a $${item.newPrice}`);
      }

      console.log(`\n✅ ${toUpdate.length} precios actualizados correctamente!`);
    }

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

validatePrices();
