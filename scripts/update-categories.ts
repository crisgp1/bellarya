import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || '';

// Mappings based on item names from the PDF
const categoryMappings: Record<string, string> = {
  // Bellarya In Casa
  'Lasaña Di Manzo': 'bellarya-in-casa',
  'Lasaña de Camarón': 'bellarya-in-casa',
  "Filete al All'Asino": 'bellarya-in-casa',
  'Rib Eye a las Finas hierbas': 'bellarya-in-casa',
  'Tacos de Langosta': 'bellarya-in-casa',
  'Tomahawk Bellarya': 'bellarya-in-casa',
  'Cola de Langosta Bellarya': 'bellarya-in-casa',
  
  // Pescados
  'Pescado a la Nonna': 'pescados',
  'Pescado al Chipotle': 'pescados',
  'Pescado a la Florentina': 'pescados',
  'Pescado a la Mantequilla': 'pescados',
  'Pescado a la Sal': 'pescados',
  
  // Pollo
  'Pollo en Salsas de Queso': 'pollo',
  'Pollo a la Napolitana': 'pollo',
  'Pollo Arrabiata': 'pollo',
  'Pollo Tropical': 'pollo',
  
  // Salmón
  'Salmón a las Finas Hierbas': 'salmon',
  'Salmón Nonna': 'salmon',
  'Salmón Tropical': 'salmon',
  'Salmón Bellarya': 'salmon',
  
  // Pulpo
  'Pulpo Nonna': 'pulpo',
  'Pulpo Ajillo': 'pulpo',
  'Pulpo Marticciata': 'pulpo',
  'Pulpo a la Pratto': 'pulpo',
  'Pulpo Bañado': 'entradas', // En el PDF está en entradas
  
  // Camarones
  'Camarones a la Diabla': 'camarones',
  'Camarones a la Mantequilla': 'camarones',
  'Camarones al Mojo': 'camarones',
  "Camarones All'Asino": 'camarones',
  'Gambas Cremosas': 'camarones',
  'Camarones a la Nonna': 'camarones',
  'Camarón Diávolo': 'camarones',
  'Camarón Toscano': 'camarones',
  'Langostino Bellarya': 'camarones',
  
  // Mejillones
  'Mejillón al Vino Blanco': 'mejillones',
  'Mejillón Al Chef': 'mejillones',
};

async function updateCategories() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB\n');

    const database = client.db('bellarya');
    const collection = database.collection('menuItems');

    let updated = 0;
    
    for (const [itemName, newCategory] of Object.entries(categoryMappings)) {
      const result = await collection.updateMany(
        { nombre: itemName },
        { $set: { categoria: newCategory } }
      );
      
      if (result.modifiedCount > 0) {
        console.log(`✓ Updated "${itemName}" to category "${newCategory}"`);
        updated += result.modifiedCount;
      }
    }

    console.log(`\n✅ Updated ${updated} items to new categories`);

    // Show summary by category
    const categories = await collection.aggregate([
      {
        $group: {
          _id: '$categoria',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]).toArray();

    console.log('\nMenu items by category:');
    categories.forEach(cat => {
      console.log(`  ${cat._id}: ${cat.count} items`);
    });

  } catch (error) {
    console.error('Error updating categories:', error);
    throw error;
  } finally {
    await client.close();
  }
}

updateCategories();
