import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || '';

async function listProteinasItems() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db('bellarya');
    const items = await db.collection('menuItems').find({ categoria: 'proteinas' }).toArray();

    console.log(`Found ${items.length} items with categoria='proteinas':\n`);
    items.forEach((item: any) => {
      console.log(`- ${item.nombre} (${item.id || 'no-id'})`);
    });

    await client.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

listProteinasItems();
