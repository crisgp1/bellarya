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

async function migrateData() {
  try {
    console.log('🔄 Conectando a MongoDB...');
    await mongoose.connect(MONGODB_URI);

    const db = mongoose.connection.db;

    console.log('📋 Listando bases de datos disponibles...');
    const adminDb = db.admin();
    const { databases } = await adminDb.listDatabases();

    console.log('Bases de datos encontradas:');
    databases.forEach((db: any) => {
      console.log(`  - ${db.name}`);
    });

    const testDb = mongoose.connection.useDb('test');
    const bellaryaDb = mongoose.connection.useDb('bellarya');

    console.log('\n📊 Verificando colecciones en la base de datos "test"...');
    const testCollections = await testDb.db.listCollections().toArray();

    if (testCollections.length === 0) {
      console.log('⚠️  No se encontraron colecciones en la base de datos "test"');
      await mongoose.disconnect();
      return;
    }

    console.log(`\n✅ Se encontraron ${testCollections.length} colecciones en "test":`);
    testCollections.forEach((coll: any) => {
      console.log(`  - ${coll.name}`);
    });

    for (const collectionInfo of testCollections) {
      const collectionName = collectionInfo.name;

      if (collectionName.startsWith('system.')) {
        console.log(`\n⏭️  Omitiendo colección del sistema: ${collectionName}`);
        continue;
      }

      console.log(`\n🔄 Migrando colección: ${collectionName}`);

      const sourceCollection = testDb.collection(collectionName);
      const targetCollection = bellaryaDb.collection(collectionName);

      const documents = await sourceCollection.find({}).toArray();
      console.log(`  📄 Documentos encontrados: ${documents.length}`);

      if (documents.length > 0) {
        const existingCount = await targetCollection.countDocuments();

        if (existingCount > 0) {
          console.log(`  ⚠️  La colección "${collectionName}" ya tiene ${existingCount} documentos en "bellarya"`);
          console.log(`  🗑️  Eliminando documentos existentes...`);
          await targetCollection.deleteMany({});
        }

        console.log(`  ➕ Insertando ${documents.length} documentos en "bellarya"...`);
        await targetCollection.insertMany(documents);
        console.log(`  ✅ Colección "${collectionName}" migrada exitosamente`);
      } else {
        console.log(`  ⚠️  La colección "${collectionName}" está vacía`);
      }
    }

    console.log('\n📊 Verificando colecciones en la base de datos "bellarya"...');
    const bellaryaCollections = await bellaryaDb.db.listCollections().toArray();
    console.log(`\n✅ Colecciones en "bellarya" (${bellaryaCollections.length}):`);

    for (const collectionInfo of bellaryaCollections) {
      const collectionName = collectionInfo.name;
      if (!collectionName.startsWith('system.')) {
        const count = await bellaryaDb.collection(collectionName).countDocuments();
        console.log(`  - ${collectionName}: ${count} documentos`);
      }
    }

    console.log('\n✅ ¡Migración completada exitosamente!');

  } catch (error) {
    console.error('❌ Error durante la migración:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Desconectado de MongoDB');
  }
}

migrateData();
