import dbConnect from '../src/lib/mongodb';
import MenuItem from '../src/models/MenuItem';

// Translation dictionaries
const nameTranslations: Record<string, string> = {
  // Entradas
  'Pan de Ajo Gratinado': 'Gratin Garlic Bread',
  'Champiñones al Ajillo': 'Garlic Mushrooms',
  'Champiñones al Forno': 'Baked Mushrooms',
  'Espárragos a la Parmesana': 'Parmesan Asparagus',
  'Aceitunas': 'Olives',
  'Queso Frito': 'Fried Cheese',
  'Carpaccio de Portobello': 'Portobello Carpaccio',
  'Carpaccio de Atún': 'Tuna Carpaccio',
  'Prosciutto': 'Prosciutto',
  'Portobello Gratinado': 'Gratin Portobello',
  'Tartar de Atún': 'Tuna Tartare',
  'Formaggio': 'Cheese Platter',
  'Hamburguesa de Portobello': 'Portobello Burger',
  'Carpaccio Di Manzo': 'Beef Carpaccio',
  'Carpaccio de Salmón': 'Salmon Carpaccio',
  'Pulpo Bañado': 'Bathed Octopus',
  'Calamares Fritos': 'Fried Calamari',
  'Tabla de Quesos': 'Cheese Board',
  'Tapas de Rib Eye': 'Rib Eye Tapas',

  // Pastas
  'Lasaña': 'Lasagna',
  'Fettuccine': 'Fettuccine',
  'Penne': 'Penne',
  'Spaghetti': 'Spaghetti',
  'Ravioles': 'Ravioli',
  'Pappardelle': 'Pappardelle',
  'Linguini': 'Linguini',
  'Rigatoni': 'Rigatoni',
  'Gnocchi': 'Gnocchi',
  'Tortellini': 'Tortellini',
  'Tagliatelle': 'Tagliatelle',

  // Proteínas
  'Filete': 'Steak',
  'Rib Eye': 'Rib Eye',
  'Tacos de Langosta': 'Lobster Tacos',
  'Tomahawk': 'Tomahawk',
  'Cola de Langosta': 'Lobster Tail',
  'Pescado': 'Fish',
  'Pollo': 'Chicken',
  'Costillas': 'Ribs',
  'Salmón': 'Salmon',
  'Atún': 'Tuna',
  'Pulpo': 'Octopus',
  'Camarones': 'Shrimp',

  // Pizzas
  'Pizza': 'Pizza',
  'Margherita': 'Margherita',
  'Napolitana': 'Neapolitan',
  'Quattro Formaggi': 'Four Cheese',
  'Pepperoni': 'Pepperoni',
  'Vegetariana': 'Vegetarian',
  'Hawaiana': 'Hawaiian',
  'Prosciutto e Funghi': 'Prosciutto and Mushrooms',

  // Postres
  'Tiramisú': 'Tiramisu',
  'Panna Cotta': 'Panna Cotta',
  'Cannoli': 'Cannoli',
  'Gelato': 'Gelato',
  'Affogato': 'Affogato',
  'Cheesecake': 'Cheesecake',
  'Tarta': 'Tart',
  'Mousse': 'Mousse',

  // Bebidas
  'Agua': 'Water',
  'Espresso': 'Espresso',
  'Cappuccino': 'Cappuccino',
  'Café': 'Coffee',
  'Té': 'Tea',
  'Limonada': 'Lemonade',
  'Naranjada': 'Orangeade',
  'Refresco': 'Soft Drink',

  // Vinos
  'Vino Tinto': 'Red Wine',
  'Vino Blanco': 'White Wine',
  'Vino Rosado': 'Rosé Wine',
  'Vino Espumoso': 'Sparkling Wine',
  'Prosecco': 'Prosecco',
  'Champagne': 'Champagne',
};

const wordTranslations: Record<string, string> = {
  // Cooking methods
  'al Ajillo': 'with Garlic',
  'a la Parmesana': 'Parmesan Style',
  'al Forno': 'Baked',
  'Gratinado': 'Gratin',
  'Frito': 'Fried',
  'a la Parrilla': 'Grilled',
  'al Horno': 'Oven Baked',
  'Salteado': 'Sautéed',
  'a la Plancha': 'Griddled',

  // Sauces
  'Alfredo': 'Alfredo',
  'Carbonara': 'Carbonara',
  'Bolognesa': 'Bolognese',
  'Pesto': 'Pesto',
  'Pomodoro': 'Tomato',
  'Arrabiata': 'Spicy Tomato',
  'Aglio e Olio': 'Garlic and Oil',
  'Puttanesca': 'Puttanesca',

  // Ingredients
  'con': 'with',
  'de': 'of',
  'y': 'and',
  'Camarones': 'Shrimp',
  'Mariscos': 'Seafood',
  'Hongos': 'Mushrooms',
  'Trufa': 'Truffle',
  'Champiñones': 'Mushrooms',
  'Espinacas': 'Spinach',
  'Jitomate': 'Tomato',
  'Albahaca': 'Basil',
  'Queso': 'Cheese',
  'Mozzarella': 'Mozzarella',
  'Parmesano': 'Parmesan',
  'Ricotta': 'Ricotta',
  'Gorgonzola': 'Gorgonzola',
  'Burrata': 'Burrata',
  'Mantequilla': 'Butter',
  'Crema': 'Cream',
  'Aceite': 'Oil',
  'Oliva': 'Olive',
  'Ajo': 'Garlic',
  'Cebolla': 'Onion',
  'Tomate': 'Tomato',
  'Chile': 'Chili',
  'Chipotle': 'Chipotle',
  'Limón': 'Lemon',
  'Naranja': 'Orange',
  'Vino Blanco': 'White Wine',
  'Vino Tinto': 'Red Wine',

  // Proteins
  'Res': 'Beef',
  'Manzo': 'Beef',
  'Cerdo': 'Pork',
  'Cordero': 'Lamb',
  'Ternera': 'Veal',
  'Langosta': 'Lobster',
  'Camarón': 'Shrimp',
  'Atún': 'Tuna',
  'Salmón': 'Salmon',
  'Pulpo': 'Octopus',
  'Calamar': 'Squid',
  'Almejas': 'Clams',
  'Mejillones': 'Mussels',
};

function translateText(text: string): string {
  let translated = text;

  // Try exact match first
  if (nameTranslations[text]) {
    return nameTranslations[text];
  }

  // Try word-by-word translation
  Object.entries(wordTranslations).forEach(([spanish, english]) => {
    const regex = new RegExp(`\\b${spanish}\\b`, 'gi');
    translated = translated.replace(regex, english);
  });

  return translated;
}

async function translateAll() {
  try {
    await dbConnect();
    console.log('✅ Connected to MongoDB\n');

    const items = await MenuItem.find({});
    console.log(`Found ${items.length} menu items to translate\n`);

    let updatedCount = 0;

    for (const item of items) {
      const nombreEn = translateText(item.nombre);
      const descripcionEn = item.descripcion ? translateText(item.descripcion) : `Italian dish: ${nombreEn}`;
      const nombreItaliaEn = item.nombreItalia || nombreEn;
      const subcategoriaEn = item.subcategoria ? translateText(item.subcategoria) : undefined;

      await MenuItem.updateOne(
        { _id: item._id },
        {
          $set: {
            nombreEn,
            descripcionEn,
            nombreItaliaEn,
            subcategoriaEn,
          },
        }
      );

      updatedCount++;

      if (updatedCount % 20 === 0) {
        console.log(`✅ Progress: ${updatedCount}/${items.length} items translated`);
      }
    }

    console.log(`\n✅ Successfully translated ALL ${updatedCount} items to English!`);
    console.log(`\nThe app will now show English translations for all menu items when language is set to 'en'`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

translateAll();
