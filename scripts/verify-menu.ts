import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || '';

async function verifyMenu() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('bellarya');
    const collection = database.collection('menuItems');

    // Count total items
    const totalCount = await collection.countDocuments();
    console.log(`\n📊 Total menu items: ${totalCount}`);

    // Show sample items from each category
    const categories = ['entradas', 'pastas', 'pizzas', 'proteinas', 'postres', 'bebidas'];

    for (const categoria of categories) {
      console.log(`\n📋 ${categoria.toUpperCase()}:`);
      const items = await collection
        .find({ categoria })
        .limit(3)
        .toArray();

      items.forEach(item => {
        const tiempo = item.tiempoPrep ? ` (${item.tiempoPrep} min)` : '';
        const picante = item.picante ? ' 🌶️' : '';
        const mesa = item.preparadoEnMesa ? ' 👨‍🍳' : '';
        console.log(`  - ${item.nombre}: $${item.precio}${tiempo}${picante}${mesa}`);
      });

      const count = await collection.countDocuments({ categoria });
      console.log(`  ... (${count} items total)`);
    }

    // Check for items with protein
    const proteinsCount = await collection.countDocuments({ proteina: { $exists: true } });
    console.log(`\n🥩 Items with protein info: ${proteinsCount}`);

    // Check for spicy items
    const spicyCount = await collection.countDocuments({ picante: true });
    console.log(`🌶️  Spicy items: ${spicyCount}`);

    // Check for items prepared at table
    const tableCount = await collection.countDocuments({ preparadoEnMesa: true });
    console.log(`👨‍🍳 Prepared at table: ${tableCount}`);

    console.log('\n✅ Menu verification completed!');

  } catch (error) {
    console.error('Error verifying menu:', error);
    throw error;
  } finally {
    await client.close();
  }
}

verifyMenu();
