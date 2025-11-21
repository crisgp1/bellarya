import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || '';

async function dropOldCollection() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB\n');

    const database = client.db('bellarya');

    // Check both collections
    const collections = await database.listCollections().toArray();
    console.log('Collections found:');
    collections.forEach(c => console.log(`  - ${c.name}`));

    // Drop the old "menuitems" collection (lowercase)
    try {
      await database.collection('menuitems').drop();
      console.log('\n✅ Dropped old "menuitems" collection');
    } catch (error: any) {
      if (error.message.includes('ns not found')) {
        console.log('\n✓ Collection "menuitems" does not exist');
      } else {
        throw error;
      }
    }

    // Verify the new collection still exists
    const menuItems = await database.collection('menuItems').countDocuments();
    console.log(`\n✓ Collection "menuItems" has ${menuItems} documents`);

  } catch (error) {
    console.error('Error:', error);
    throw error;
  } finally {
    await client.close();
  }
}

dropOldCollection();
