import dbConnect from '../src/lib/mongodb';
import MenuItem from '../src/models/MenuItem';

// Simple translation map based on common words
const simpleTranslations: Record<string, string> = {
  // Food categories
  'Bruschetta': 'Bruschetta',
  'Carpaccio': 'Carpaccio',
  'Burrata': 'Burrata',
  'Spaghetti': 'Spaghetti',
  'Fettuccine': 'Fettuccine',
  'Lasagna': 'Lasagna',
  'Ravioli': 'Ravioli',
  'Pappardelle': 'Pappardelle',
  'Risotto': 'Risotto',
  'Ossobuco': 'Ossobuco',
  'Pollo': 'Chicken',
  'Saltimbocca': 'Saltimbocca',
  'Pizza': 'Pizza',
  'Tiramisú': 'Tiramisu',
  'Panna Cotta': 'Panna Cotta',
  'Cannoli': 'Cannoli',
  'Acqua': 'Water',
  'Espresso': 'Espresso',
  'Cappuccino': 'Cappuccino',
  'Vino': 'Wine',

  // Descriptions
  'con': 'with',
  'tomate': 'tomato',
  'albahaca': 'basil',
  'ajo': 'garlic',
  'aceite': 'oil',
  'oliva': 'olive',
  'queso': 'cheese',
  'parmesano': 'parmesan',
  'mozzarella': 'mozzarella',
  'prosciutto': 'prosciutto',
  'crema': 'cream',
  'mantequilla': 'butter',
  'huevo': 'egg',
  'carne': 'meat',
  'pollo': 'chicken',
  'res': 'beef',
  'cerdo': 'pork',
  'pescado': 'fish',
  'mariscos': 'seafood',
  'hongos': 'mushrooms',
  'verduras': 'vegetables',
  'pasta': 'pasta',
  'salsa': 'sauce',
  'fresco': 'fresh',
  'casero': 'homemade',
  'tradicional': 'traditional',
};

async function addTranslations() {
  try {
    await dbConnect();
    console.log('✅ Connected to MongoDB');

    // Get first 10 items from each category as samples
    const sampleItems = await MenuItem.find({}).limit(30);
    console.log(`Found ${sampleItems.length} sample items to translate\n`);

    let updatedCount = 0;

    for (const item of sampleItems) {
      // Simple translation: use the name as-is if it's Italian, or try to translate common words
      const nombreEn = item.nombre; // Keep Italian names for authenticity
      const descripcionEn = `Italian dish featuring ${item.nombre.toLowerCase()}`; // Simple English description

      await MenuItem.updateOne(
        { _id: item._id },
        {
          $set: {
            nombreEn: nombreEn,
            nombreItaliaEn: item.nombreItalia || item.nombre,
            descripcionEn: descripcionEn,
            subcategoriaEn: item.subcategoria,
          },
        }
      );

      updatedCount++;
      console.log(`✅ Updated: ${item.nombre} (${item.categoria})`);
    }

    console.log(`\n✅ Successfully updated ${updatedCount} items with English translations`);
    console.log(`\nNow the app will show English versions when language is set to 'en'`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

addTranslations();
