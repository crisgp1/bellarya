import mongoose from 'mongoose';
import MenuItem from '../src/models/MenuItem';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function checkWines() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    await mongoose.connect(mongoUri!);

    const wines = await MenuItem.find({ categoria: 'vinos' }).limit(5);
    console.log('Total wines found:', wines.length);

    if (wines.length > 0) {
      console.log('\nFirst 5 wines:');
      wines.forEach(w => {
        console.log(`- ${w.nombre} (${w.categoria}) - $${w.precio}`);
      });
    } else {
      console.log('No wines found in database!');

      // Check what's in the database
      const allItems = await MenuItem.countDocuments();
      console.log(`Total items in database: ${allItems}`);

      const byCategoria = await MenuItem.aggregate([
        { $group: { _id: '$categoria', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);

      console.log('\nItems by categoria:');
      byCategoria.forEach(cat => {
        console.log(`- ${cat._id}: ${cat.count}`);
      });
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkWines();
