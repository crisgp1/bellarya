import dbConnect from '../src/lib/mongodb';
import MenuItem from '../src/models/MenuItem';

// Sample translations for demonstration
const sampleTranslations: Record<string, { nombreEn: string; descripcionEn: string; nombreItaliaEn?: string; subcategoriaEn?: string }> = {
  'bruschetta-classica': {
    nombreEn: 'Classic Bruschetta',
    nombreItaliaEn: 'Bruschetta Classica',
    descripcionEn: 'Toasted bread with fresh tomato, basil, garlic and extra virgin olive oil',
  },
  'carpaccio-res': {
    nombreEn: 'Beef Carpaccio',
    nombreItaliaEn: 'Carpaccio di Manzo',
    descripcionEn: 'Thin slices of raw beef with arugula, parmesan and balsamic reduction',
  },
  'burrata-prosciutto': {
    nombreEn: 'Burrata with Prosciutto',
    nombreItaliaEn: 'Burrata e Prosciutto',
    descripcionEn: 'Fresh burrata with Parma prosciutto, cherry tomatoes and basil',
  },
  'spaghetti-carbonara': {
    nombreEn: 'Spaghetti Carbonara',
    nombreItaliaEn: 'Spaghetti alla Carbonara',
    descripcionEn: 'Traditional Roman pasta with guanciale, eggs, pecorino cheese and black pepper',
  },
  'fettuccine-alfredo': {
    nombreEn: 'Fettuccine Alfredo',
    nombreItaliaEn: 'Fettuccine Alfredo',
    descripcionEn: 'Pasta with creamy parmesan sauce and butter',
  },
  'lasagna-bolognese': {
    nombreEn: 'Bolognese Lasagna',
    nombreItaliaEn: 'Lasagna alla Bolognese',
    descripcionEn: 'Layers of pasta with meat ragù, béchamel and parmesan',
  },
  'ravioli-ricotta': {
    nombreEn: 'Ricotta Ravioli',
    nombreItaliaEn: 'Ravioli di Ricotta',
    descripcionEn: 'Handmade ravioli filled with ricotta and spinach in sage butter sauce',
  },
  'pappardelle-funghi': {
    nombreEn: 'Pappardelle with Mushrooms',
    nombreItaliaEn: 'Pappardelle ai Funghi',
    descripcionEn: 'Wide pasta with porcini mushrooms, truffle oil and parmesan',
  },
  'risotto-mariscos': {
    nombreEn: 'Seafood Risotto',
    nombreItaliaEn: 'Risotto ai Frutti di Mare',
    descripcionEn: 'Creamy risotto with fresh seafood, white wine and parsley',
  },
  'ossobuco-milanese': {
    nombreEn: 'Ossobuco Milanese',
    nombreItaliaEn: 'Ossobuco alla Milanese',
    descripcionEn: 'Braised veal shank with saffron risotto and gremolata',
  },
  'pollo-parmigiana': {
    nombreEn: 'Chicken Parmigiana',
    nombreItaliaEn: 'Pollo alla Parmigiana',
    descripcionEn: 'Breaded chicken breast with tomato sauce and melted mozzarella',
  },
  'saltimbocca-romana': {
    nombreEn: 'Saltimbocca Romana',
    nombreItaliaEn: 'Saltimbocca alla Romana',
    descripcionEn: 'Veal medallions with prosciutto and sage in white wine sauce',
  },
  'pizza-margherita': {
    nombreEn: 'Margherita Pizza',
    nombreItaliaEn: 'Pizza Margherita',
    descripcionEn: 'Classic Neapolitan pizza with tomato, mozzarella and fresh basil',
  },
  'pizza-quattro-stagioni': {
    nombreEn: 'Four Seasons Pizza',
    nombreItaliaEn: 'Pizza Quattro Stagioni',
    descripcionEn: 'Pizza divided into four sections with artichokes, ham, mushrooms and olives',
  },
  'pizza-diavola': {
    nombreEn: 'Diavola Pizza',
    nombreItaliaEn: 'Pizza Diavola',
    descripcionEn: 'Spicy pizza with tomato, mozzarella and spicy salami',
  },
  'tiramisu': {
    nombreEn: 'Tiramisu',
    nombreItaliaEn: 'Tiramisù',
    descripcionEn: 'Classic Italian dessert with coffee-soaked ladyfingers, mascarpone and cocoa',
  },
  'panna-cotta': {
    nombreEn: 'Panna Cotta',
    nombreItaliaEn: 'Panna Cotta',
    descripcionEn: 'Delicate cream dessert with berry coulis',
  },
  'cannoli-siciliani': {
    nombreEn: 'Sicilian Cannoli',
    nombreItaliaEn: 'Cannoli Siciliani',
    descripcionEn: 'Crispy pastry tubes filled with sweet ricotta cream and chocolate chips',
  },
  'acqua-panna': {
    nombreEn: 'Panna Water',
    descripcionEn: 'Still natural mineral water',
  },
  'san-pellegrino': {
    nombreEn: 'San Pellegrino',
    descripcionEn: 'Sparkling natural mineral water',
  },
  'limonata': {
    nombreEn: 'Lemonade',
    nombreItaliaEn: 'Limonata',
    descripcionEn: 'Freshly squeezed lemon juice with sugar',
  },
  'espresso': {
    nombreEn: 'Espresso',
    descripcionEn: 'Strong Italian coffee',
  },
  'cappuccino': {
    nombreEn: 'Cappuccino',
    descripcionEn: 'Coffee with steamed milk and foam',
  },
};

async function addTranslations() {
  try {
    await dbConnect();
    console.log('✅ Connected to MongoDB');

    // Get all items
    const items = await MenuItem.find({});
    console.log(`Found ${items.length} menu items`);

    let updatedCount = 0;

    // Update items with translations
    for (const item of items) {
      const translation = sampleTranslations[item.id];

      if (translation) {
        await MenuItem.updateOne(
          { id: item.id },
          {
            $set: {
              nombreEn: translation.nombreEn,
              descripcionEn: translation.descripcionEn,
              nombreItaliaEn: translation.nombreItaliaEn,
              subcategoriaEn: translation.subcategoriaEn,
            },
          }
        );
        updatedCount++;
        console.log(`✅ Updated: ${item.nombre} -> ${translation.nombreEn}`);
      }
    }

    console.log(`\n✅ Successfully updated ${updatedCount} items with English translations`);
    console.log(`⚠️  ${items.length - updatedCount} items still need translations`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

addTranslations();
