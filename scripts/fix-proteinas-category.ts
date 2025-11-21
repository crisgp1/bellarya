import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || '';

async function fixProteinasCategory() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB\n');

    const database = client.db('bellarya');
    const collection = database.collection('menuItems');

    // Find all items with categoria = 'proteinas'
    const proteinasItems = await collection.find({ categoria: 'proteinas' }).toArray();
    
    console.log(`Found ${proteinasItems.length} items with categoria='proteinas'\n`);
    
    if (proteinasItems.length === 0) {
      console.log('No items to update!');
      return;
    }

    // Update based on item names or default to 'entradas'
    for (const item of proteinasItems) {
      let newCategoria = 'entradas'; // Default fallback
      
      // Try to determine correct category based on name patterns
      const nombre = item.nombre.toLowerCase();
      
      if (nombre.includes('salmón') || nombre.includes('salmon')) {
        newCategoria = 'salmon';
      } else if (nombre.includes('pulpo')) {
        newCategoria = 'pulpo';
      } else if (nombre.includes('camar') || nombre.includes('langost') || nombre.includes('gamba')) {
        newCategoria = 'camarones';
      } else if (nombre.includes('mejillón') || nombre.includes('mejillon')) {
        newCategoria = 'mejillones';
      } else if (nombre.includes('pollo')) {
        newCategoria = 'pollo';
      } else if (nombre.includes('pescado')) {
        newCategoria = 'pescados';
      } else if (nombre.includes('lasaña') || nombre.includes('filete') || nombre.includes('rib eye') || nombre.includes('tomahawk')) {
        newCategoria = 'bellarya-in-casa';
      }
      
      await collection.updateOne(
        { _id: item._id },
        { $set: { categoria: newCategoria } }
      );
      
      console.log(`✓ Updated "${item.nombre}" from 'proteinas' to '${newCategoria}'`);
    }

    console.log(`\n✅ Successfully updated ${proteinasItems.length} items`);

    // Show final summary
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

    console.log('\nFinal category counts:');
    categories.forEach(cat => {
      console.log(`  ${cat._id}: ${cat.count} items`);
    });

  } catch (error) {
    console.error('Error:', error);
    throw error;
  } finally {
    await client.close();
  }
}

fixProteinasCategory();
