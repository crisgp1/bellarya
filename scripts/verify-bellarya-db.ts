import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ Error: MONGODB_URI no está definida en .env.local');
  process.exit(1);
}

async function verifyData() {
  try {
    console.log('🔄 Conectando a MongoDB con base de datos "bellarya"...');
    await mongoose.connect(MONGODB_URI, { dbName: 'bellarya' });

    const db = mongoose.connection.db;

    console.log('\n📊 Verificando colecciones en "bellarya"...');
    const collections = await db.listCollections().toArray();

    console.log(`\n✅ Colecciones encontradas: ${collections.length}`);

    for (const collectionInfo of collections) {
      const collectionName = collectionInfo.name;
      if (!collectionName.startsWith('system.')) {
        const collection = db.collection(collectionName);
        const count = await collection.countDocuments();
        console.log(`\n📦 Colección: ${collectionName}`);
        console.log(`   📄 Total de documentos: ${count}`);

        if (count > 0) {
          const sample = await collection.findOne({});
          console.log(`   📝 Ejemplo de documento:`);
          console.log(JSON.stringify(sample, null, 2).substring(0, 300) + '...');
        }
      }
    }

    console.log('\n✅ ¡Verificación completada!');

  } catch (error) {
    console.error('❌ Error durante la verificación:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Desconectado de MongoDB');
  }
}

verifyData();
