import { config } from 'dotenv';
import { resolve } from 'path';
import mongoose from 'mongoose';

config({ path: resolve(process.cwd(), '.env.local') });

const menuItemSchema = new mongoose.Schema({}, { strict: false });
const MenuItem = mongoose.models.MenuItem || mongoose.model('MenuItem', menuItemSchema);

// English translations mapping
interface Translation {
  nombreEn?: string;
  descripcionEn?: string;
  subcategoriaEn?: string;
  nombreItaliaEn?: string;
}

const translations: Record<string, Translation> = {
  // APPETIZERS
  'ent-001': { nombreEn: 'Garlic Bread Gratinée', descripcionEn: 'Toasted bread with garlic butter and cheese blend' },
  'ent-002': { nombreEn: 'Mushrooms in Garlic Sauce', descripcionEn: 'Sautéed mushrooms in house garlic sauce' },
  'ent-003': { nombreEn: 'Oven-Baked Mushrooms', descripcionEn: 'Baked mushrooms gratinéed with parmesan slices' },
  'ent-004': { nombreEn: 'Parmesan Asparagus', descripcionEn: 'Roasted asparagus with Grana Padano parmesan' },
  'ent-005': { nombreEn: 'Olives', descripcionEn: 'Blue cheese, peppers, and anchovies' },
  'ent-006': { nombreEn: 'Fried Cheese', descripcionEn: 'Fresh breaded mozzarella with house pomodoro sauce' },
  'ent-007': { nombreEn: 'Portobello Carpaccio', descripcionEn: 'Thin portobello slices with black sauce, olive oil, and fresh arugula' },
  'ent-008': { nombreEn: 'Tuna Carpaccio', descripcionEn: 'Tuna slices with citrus ponzu sauce and jalapeño' },
  'ent-009': { nombreEn: 'Prosciutto', nombreItaliaEn: 'Prosciutto di Parma', descripcionEn: '100g thinly sliced prosciutto with tomato bread - Table-side preparation' },
  'ent-010': { nombreEn: 'Portobello Gratinée', descripcionEn: 'Baked portobello gratinéed with mozzarella, gouda, and parmesan, served with vegetables' },
  'ent-011': { nombreEn: 'Tuna Tartare', descripcionEn: 'Fresh tuna cubes with avocado and ponzu sauce' },
  'ent-012': { nombreEn: 'Formaggio', descripcionEn: 'Four-cheese blend with spinach and roasted cherry tomatoes, served with house bread' },
  'ent-013': { nombreEn: 'Portobello Burger', descripcionEn: '200g Choice beef, gratinéed portobello with Dijon mustard' },
  'ent-014': { nombreEn: 'Beef Carpaccio', nombreItaliaEn: 'Carpaccio di Manzo', descripcionEn: 'Thin beef tenderloin slices with parmesan, fresh arugula, herb olive oil, and capers' },
  'ent-015': { nombreEn: 'Salmon Carpaccio', descripcionEn: 'Fresh sashimi-cut salmon with sauce' },
  'ent-016': { nombreEn: 'Breaded Octopus', descripcionEn: 'Crispy breaded octopus with arrabiata-style sauce and Grana Padano' },
  'ent-017': { nombreEn: 'Fried Calamari', nombreItaliaEn: 'Calamari Fritti', descripcionEn: 'Crispy breaded with parmesan and tartar sauce' },
  'ent-018': { nombreEn: 'Cheese Board', descripcionEn: 'Gouda, mozzarella, blue cheese, ash goat cheese, classic parmesan, and Rancho de los Altos cheese', subcategoriaEn: 'board' },
  'ent-019': { nombreEn: 'Rib Eye Tapas', descripcionEn: 'Rib eye chicharrón on pita bread with guacamole, topped with onion and cilantro' },
  'ent-020': { nombreEn: 'Minestrone Soup', nombreItaliaEn: 'Minestrone', descripcionEn: 'Italian-style vegetable soup with celery, carrot, potato, and tomato', subcategoriaEn: 'soups' },
  'ent-021': { nombreEn: 'Broccoli Cream', descripcionEn: 'Classic broccoli cream with parmesan', subcategoriaEn: 'soups' },
  'ent-022': { nombreEn: 'Clam Chowder', descripcionEn: 'Classic clam cream', subcategoriaEn: 'soups' },
  'ent-023': { nombreEn: 'Caesar Salad', nombreItaliaEn: 'Insalata Cesare', descripcionEn: 'Table-side preparation by our captain', subcategoriaEn: 'salads' },
  'ent-024': { nombreEn: 'Caprese Salad', nombreItaliaEn: 'Insalata Caprese', descripcionEn: 'Fresh mozzarella, tomato, and basil', subcategoriaEn: 'salads' },
  'ent-025': { nombreEn: 'Bella-Lato Salad', descripcionEn: 'Mixed greens with candied walnuts, prosciutto, and mint gelato', subcategoriaEn: 'salads' },
  'ent-026': { nombreEn: 'Seafood Salad', nombreItaliaEn: 'Insalata di Mare', descripcionEn: 'Seafood mix: shrimp, octopus, mussels, and calamari with olive oil and parsley', subcategoriaEn: 'salads' },
  'ent-027': { nombreEn: 'Caligula Salad', descripcionEn: 'Mixed greens with berry vinaigrette and burrata cheese', subcategoriaEn: 'salads' },

  // PROTEINS - BELLARYA SIGNATURES
  'pro-001': { nombreEn: 'Beef Lasagna', nombreItaliaEn: 'Lasagne di Manzo', descripcionEn: 'Traditional house meat sauce lasagna with house cheese blend', subcategoriaEn: 'bellarya signatures' },
  'pro-002': { nombreEn: 'Shrimp Lasagna', descripcionEn: 'Classic béchamel lasagna with butter shrimp, peppers, and house cheese blend', subcategoriaEn: 'bellarya signatures' },
  'pro-003': { nombreEn: "Filet All'Asino", descripcionEn: 'Beef tenderloin with house compound butter', subcategoriaEn: 'bellarya signatures' },
  'pro-004': { nombreEn: 'Herb Rib Eye', descripcionEn: '400g Herb-crusted rib eye', subcategoriaEn: 'bellarya signatures' },
  'pro-005': { nombreEn: 'Herb Rib Eye', descripcionEn: '600g Herb-crusted rib eye', subcategoriaEn: 'bellarya signatures' },
  'pro-006': { nombreEn: 'Lobster Tacos', descripcionEn: 'Romaine lettuce wraps with lobster tail, clarified butter, and house sauce', subcategoriaEn: 'bellarya signatures' },
  'pro-007': { nombreEn: 'Tomahawk Bellarya', descripcionEn: '1kg Herb-crusted with salt finish', subcategoriaEn: 'bellarya signatures' },
  'pro-008': { nombreEn: 'Lobster Tail Bellarya', descripcionEn: 'Lobster in citrus butter', subcategoriaEn: 'bellarya signatures' },

  // FISH
  'pro-009': { nombreEn: 'Fish a la Nonna', descripcionEn: 'Fish with house 7-chile sauce', subcategoriaEn: 'fish' },
  'pro-010': { nombreEn: 'Chipotle Fish', descripcionEn: 'Fish in creamy chipotle sauce with butter', subcategoriaEn: 'fish' },
  'pro-011': { nombreEn: 'Florentine Fish', descripcionEn: 'Grilled fish with herbs, mixed greens, and vegetable sticks', subcategoriaEn: 'fish' },
  'pro-012': { nombreEn: 'Butter Fish', descripcionEn: 'Fish with rosemary-parsley-pepper-lemon compound butter', subcategoriaEn: 'fish' },
  'pro-013': { nombreEn: 'Salt-Crusted Fish', descripcionEn: 'Table-side preparation - Herb-crusted, baked in salt crust', subcategoriaEn: 'fish' },

  // CHICKEN
  'pro-014': { nombreEn: 'Chicken in Cheese Sauce', descripcionEn: 'Chicken in house cheese blend sauce', subcategoriaEn: 'chicken' },
  'pro-015': { nombreEn: 'Chicken Napolitana', descripcionEn: 'Breaded chicken with Tuscan bread, pomodoro sauce, and fresh mozzarella', subcategoriaEn: 'chicken' },
  'pro-016': { nombreEn: 'Chicken Arrabiata', descripcionEn: 'Chicken breast in spicy pomodoro with peperoncino', subcategoriaEn: 'chicken' },
  'pro-017': { nombreEn: 'Tropical Chicken', descripcionEn: 'Baked and sautéed chicken breast with gratinéed pepper mix and bacon', subcategoriaEn: 'chicken' },

  // SALMON
  'pro-018': { nombreEn: 'Herb Salmon', descripcionEn: 'Baked salmon with herbs and clarified butter', subcategoriaEn: 'salmon' },
  'pro-019': { nombreEn: 'Salmon Nonna', descripcionEn: 'Salmon with house 7-chile sauce', subcategoriaEn: 'salmon' },
  'pro-020': { nombreEn: 'Tropical Salmon', descripcionEn: 'Baked salmon with gratinéed pepper mix and bacon', subcategoriaEn: 'salmon' },
  'pro-021': { nombreEn: 'Salmon Bellarya', descripcionEn: 'Herb-baked salmon on vegetable bed with vegetable sticks', subcategoriaEn: 'salmon' },

  // OCTOPUS
  'pro-022': { nombreEn: 'Octopus Nonna', descripcionEn: 'Octopus with house 7-chile sauce', subcategoriaEn: 'octopus' },
  'pro-023': { nombreEn: 'Garlic Octopus', descripcionEn: 'Octopus in pure garlic sauce', subcategoriaEn: 'octopus' },
  'pro-024': { nombreEn: 'Octopus Marticciata', descripcionEn: 'Octopus in white wine with spicy arrabiata sauce', subcategoriaEn: 'octopus' },
  'pro-025': { nombreEn: 'Octopus a la Pratto', descripcionEn: 'Octopus, shrimp, and smoked marlin with onion and serrano', subcategoriaEn: 'octopus' },

  // SHRIMP
  'pro-026': { nombreEn: 'Shrimp', descripcionEn: 'Diablo style - Butter style - Garlic style', subcategoriaEn: 'shrimp' },
  'pro-027': { nombreEn: "Shrimp All'Asino", descripcionEn: 'Shrimp in rosemary-parsley-pepper-salt-lemon compound butter', subcategoriaEn: 'shrimp' },
  'pro-028': { nombreEn: 'Creamy Gambas', descripcionEn: 'Head-on shrimp with chile-infused mayo on lettuce bed', subcategoriaEn: 'shrimp' },
  'pro-029': { nombreEn: 'Shrimp a la Nonna', descripcionEn: 'Shrimp in house 7-chile sauce with olive oil', subcategoriaEn: 'shrimp' },
  'pro-030': { nombreEn: 'Shrimp Diavolo', descripcionEn: 'Spicy creamy shrimp with asparagus', subcategoriaEn: 'shrimp' },
  'pro-031': { nombreEn: 'Tuscan Shrimp', descripcionEn: 'Creamy shrimp on Tuscan bread with peperoncino and cherry tomatoes, garnished with parsley', subcategoriaEn: 'shrimp' },
  'pro-032': { nombreEn: 'Langostino Bellarya', descripcionEn: 'Langostino in 6-chile sauce with honey-mustard glaze', subcategoriaEn: 'shrimp' },

  // MUSSELS
  'pro-033': { nombreEn: 'Mussels in White Wine', descripcionEn: 'Mussels with clarified butter and white wine', subcategoriaEn: 'mussels' },
  'pro-034': { nombreEn: "Chef's Mussels", descripcionEn: 'Mussels in spicy peperoncino-béchamel sauce', subcategoriaEn: 'mussels' },

  // PIZZAS
  'piz-001': { nombreEn: 'Margherita Pizza', nombreItaliaEn: 'Pizza Margherita', descripcionEn: 'Mozzarella with basil and tomato' },
  'piz-002': { nombreEn: 'Four Cheese Pizza', nombreItaliaEn: 'Pizza Quattro Formaggi', descripcionEn: 'House four-cheese blend' },
  'piz-003': { nombreEn: 'Pepperoni Pizza', descripcionEn: 'Pepperoni and red onion' },
  'piz-004': { nombreEn: 'House Special Pizza', descripcionEn: 'Black olives, red onion, capers, Italian sausage, and jalapeño' },
  'piz-005': { nombreEn: 'Prosciutto Pizza', descripcionEn: 'Prosciutto slices with fresh arugula' },
  'piz-006': { nombreEn: 'Diavolo Pizza', descripcionEn: 'Arrabiata-béchamel blend with shrimp and asparagus' },
  'piz-007': { nombreEn: 'Octopus del Pratto Pizza', descripcionEn: 'Octopus, shrimp, and smoked marlin with serrano and red onion' },
  'piz-008': { nombreEn: 'Venice Pizza', descripcionEn: 'Portobello mushroom with ash goat cheese, onion, and Italian sausage' },

  // PASTAS - TRADITIONAL
  'pas-001': { nombreEn: 'Pasta al Burro', descripcionEn: 'Butter and parmesan', subcategoriaEn: 'traditional' },
  'pas-002': { nombreEn: 'Pasta Pomodoro', descripcionEn: 'Classic pomodoro', subcategoriaEn: 'traditional' },
  'pas-003': { nombreEn: 'Pasta Alfredo', descripcionEn: 'Three-cheese sauce', subcategoriaEn: 'traditional' },
  'pas-004': { nombreEn: 'Pasta Bolognese', nombreItaliaEn: 'Pasta alla Bolognese', descripcionEn: 'Classic preparation', subcategoriaEn: 'traditional' },
  'pas-005': { nombreEn: 'Pasta Arrabiata', nombreItaliaEn: "Pasta all'Arrabbiata", descripcionEn: 'Pomodoro with spice and bell pepper', subcategoriaEn: 'traditional' },
  'pas-006': { nombreEn: 'Pasta Pesto', nombreItaliaEn: 'Pasta al Pesto', descripcionEn: 'Pine nut, basil, olive oil, and parmesan', subcategoriaEn: 'traditional' },
  'pas-007': { nombreEn: 'Pasta Carbonara', nombreItaliaEn: 'Pasta alla Carbonara', descripcionEn: 'Egg, bacon, and parmesan', subcategoriaEn: 'traditional' },
  'pas-008': { nombreEn: 'Pasta Diavolo', descripcionEn: 'Béchamel-arrabiata blend (creamy spicy)', subcategoriaEn: 'traditional' },

  // BELLARYA SPECIALE
  'pas-009': { nombreEn: 'Peperoncino Verde', descripcionEn: 'Poblano chile base with parmesan', subcategoriaEn: 'speciale' },
  'pas-010': { nombreEn: 'Pasta Rosa', descripcionEn: 'Creamy salmon sauce with house tomato blend', subcategoriaEn: 'speciale' },
  'pas-011': { nombreEn: 'Frutti Di Mare', descripcionEn: 'Seafood mix with seafood stock base', subcategoriaEn: 'speciale' },
  'pas-012': { nombreEn: 'Grana Bellarya', descripcionEn: 'Table-side preparation - Fettuccine in house cream sauce with truffle oil and preserved truffle', subcategoriaEn: 'speciale' },
  'pas-013': { nombreEn: 'Fusilli Tears of Pratto', descripcionEn: 'Four-cheese sauce with fresh cherry tomatoes', subcategoriaEn: 'speciale' },

  // DESSERTS
  'pos-001': { nombreEn: 'Cheesecake', descripcionEn: 'New York style cheesecake' },
  'pos-002': { nombreEn: 'Chocolate Colosseum', descripcionEn: 'Decadent chocolate layers dessert' },
  'pos-003': { nombreEn: 'Tiramisu', descripcionEn: 'Classic Italian dessert with coffee, mascarpone, and cocoa' },
  'pos-004': { nombreEn: 'Brownie', descripcionEn: 'Warm chocolate brownie' },
  'pos-005': { nombreEn: 'Ice Cream', descripcionEn: 'Artisan ice cream (various flavors)' },

  // BEVERAGES - BEER
  'beb-001': { nombreEn: 'Corona Light/Dark', descripcionEn: 'Classic Mexican beer', subcategoriaEn: 'beer' },
  'beb-002': { nombreEn: 'Victoria', descripcionEn: 'Mexican beer', subcategoriaEn: 'beer' },
  'beb-003': { nombreEn: 'Pacifico', descripcionEn: 'Mexican lager', subcategoriaEn: 'beer' },
  'beb-004': { nombreEn: 'Modelo Especial', descripcionEn: 'Premium Mexican beer', subcategoriaEn: 'beer' },
  'beb-005': { nombreEn: 'Negra Modelo', descripcionEn: 'Mexican dark beer', subcategoriaEn: 'beer' },
  'beb-006': { nombreEn: 'Stella Artois', descripcionEn: 'Premium Belgian beer', subcategoriaEn: 'beer' },
  'beb-007': { nombreEn: 'Miller', descripcionEn: 'American beer', subcategoriaEn: 'beer' },
  'beb-008': { nombreEn: 'Heineken', descripcionEn: 'Premium Dutch beer', subcategoriaEn: 'beer' },
  'beb-009': { nombreEn: 'Amstel Ultra', descripcionEn: 'Premium light beer', subcategoriaEn: 'beer' },
  'beb-010': { nombreEn: 'Tecate', descripcionEn: 'Classic Mexican beer', subcategoriaEn: 'beer' },
  'beb-011': { nombreEn: 'Tecate Light', descripcionEn: 'Mexican light beer', subcategoriaEn: 'beer' },
  'beb-012': { nombreEn: 'XX Lager', descripcionEn: 'Mexican lager', subcategoriaEn: 'beer' },
  'beb-013': { nombreEn: 'XX Ambar', descripcionEn: 'Mexican amber beer', subcategoriaEn: 'beer' },
  'beb-014': { nombreEn: 'Bohemia Light/Dark', descripcionEn: 'Mexican craft beer', subcategoriaEn: 'beer' },
  'beb-015': { nombreEn: 'Bohemia Kristal', descripcionEn: 'Mexican craft lager', subcategoriaEn: 'beer' },
  'beb-016': { nombreEn: 'Strongbow (Prepared)', descripcionEn: 'Prepared cider', subcategoriaEn: 'beer' },
  'beb-017': { nombreEn: 'Michelada', descripcionEn: 'Classic Mexican beer preparation', subcategoriaEn: 'beer' },
  'beb-018': { nombreEn: 'Cañita', descripcionEn: 'Local craft beer', subcategoriaEn: 'craft beer' },
  'beb-019': { nombreEn: 'California Ale', descripcionEn: 'California-style craft beer', subcategoriaEn: 'craft beer' },
  'beb-020': { nombreEn: 'Pale Ale', descripcionEn: 'Craft pale ale', subcategoriaEn: 'craft beer' },
  'beb-021': { nombreEn: 'Hazy Pale Ale', descripcionEn: 'Hazy craft beer', subcategoriaEn: 'craft beer' },
  'beb-022': { nombreEn: 'Stout', descripcionEn: 'Dark craft beer', subcategoriaEn: 'craft beer' },
  'beb-023': { nombreEn: 'IPA Ippolita', descripcionEn: 'Craft India Pale Ale', subcategoriaEn: 'craft beer' },
  'beb-024': { nombreEn: 'Sake Ale', descripcionEn: 'Fusion craft beer', subcategoriaEn: 'craft beer' },
  'beb-025': { nombreEn: 'Neipolita', descripcionEn: 'NEIPA craft beer', subcategoriaEn: 'craft beer' },

  // SOFT DRINKS
  'beb-026': { nombreEn: 'Coca Cola', descripcionEn: 'Cola soft drink', subcategoriaEn: 'soft drinks' },
  'beb-027': { nombreEn: 'Coca Cola Light', descripcionEn: 'Diet cola', subcategoriaEn: 'soft drinks' },
  'beb-028': { nombreEn: 'Coca Zero', descripcionEn: 'Zero sugar cola', subcategoriaEn: 'soft drinks' },
  'beb-029': { nombreEn: 'Sprite', descripcionEn: 'Lemon-lime soda', subcategoriaEn: 'soft drinks' },
  'beb-030': { nombreEn: 'Fanta', descripcionEn: 'Orange soda', subcategoriaEn: 'soft drinks' },
  'beb-031': { nombreEn: 'Fresca', descripcionEn: 'Grapefruit soda', subcategoriaEn: 'soft drinks' },
  'beb-032': { nombreEn: 'Peñafiel Sparkling Water', descripcionEn: 'Sparkling mineral water', subcategoriaEn: 'soft drinks' },
  'beb-033': { nombreEn: 'Perrier', descripcionEn: 'Premium sparkling water', subcategoriaEn: 'soft drinks' },
  'beb-034': { nombreEn: 'Piedra Grande Water', descripcionEn: 'Premium still water', subcategoriaEn: 'soft drinks' },
  'beb-035': { nombreEn: 'Lemonade', descripcionEn: 'House-made lemonade', subcategoriaEn: 'soft drinks' },
  'beb-036': { nombreEn: 'Orangeade', descripcionEn: 'House-made orangeade', subcategoriaEn: 'soft drinks' },

  // COFFEE
  'beb-037': { nombreEn: 'Americano', descripcionEn: 'American-style coffee', subcategoriaEn: 'coffee' },
  'beb-038': { nombreEn: 'Espresso', descripcionEn: 'Italian espresso', subcategoriaEn: 'coffee' },
  'beb-039': { nombreEn: 'Double Espresso', descripcionEn: 'Double shot espresso', subcategoriaEn: 'coffee' },
  'beb-040': { nombreEn: 'Cappuccino', descripcionEn: 'Italian cappuccino', subcategoriaEn: 'coffee' },
  'beb-041': { nombreEn: 'Chai', descripcionEn: 'Chai tea latte', subcategoriaEn: 'coffee' },
  'beb-042': { nombreEn: 'Affogato', descripcionEn: 'Vanilla ice cream with hot espresso', subcategoriaEn: 'coffee' },
  'beb-043': { nombreEn: 'Carajillo', descripcionEn: 'Coffee with liqueur', subcategoriaEn: 'coffee' },
  'beb-044': { nombreEn: 'Canija', descripcionEn: 'House special coffee with liqueur', subcategoriaEn: 'coffee' },
  'beb-045': { nombreEn: 'Hot Chocolate', descripcionEn: 'Artisan hot chocolate', subcategoriaEn: 'coffee' },
  'beb-046': { nombreEn: 'Frappuccino', descripcionEn: 'Iced blended coffee', subcategoriaEn: 'coffee' },

  // MOCKTAILS
  'beb-047': { nombreEn: 'MARLEN', descripcionEn: 'Passion fruit, orange, lime, and pineapple', subcategoriaEn: 'mocktails' },
  'beb-048': { nombreEn: 'JANETT', descripcionEn: 'Strawberry, berries, lime, and cranberry juice', subcategoriaEn: 'mocktails' },
  'beb-049': { nombreEn: 'VIRIDIANA', descripcionEn: 'Lychee, mint, spearmint, and lime', subcategoriaEn: 'mocktails' },

  // ITALIAN SODAS
  'beb-050': { nombreEn: 'Blueberry', descripcionEn: 'With Flavor Burst Pearls!', subcategoriaEn: 'italian sodas' },
  'beb-051': { nombreEn: 'Green Apple', descripcionEn: 'With Flavor Burst Pearls!', subcategoriaEn: 'italian sodas' },
  'beb-052': { nombreEn: 'Berry Mix', descripcionEn: 'With Flavor Burst Pearls!', subcategoriaEn: 'italian sodas' },

  // COCKTAILS
  'beb-053': { nombreEn: 'COLISEO', descripcionEn: 'Cherry essence, red wine, orange, and peach shrub', subcategoriaEn: 'house cocktails' },
  'beb-054': { nombreEn: 'POMPEYA', descripcionEn: 'Berries, lime, cranberry, red wine, lemon-mint tea', subcategoriaEn: 'house cocktails' },
  'beb-055': { nombreEn: 'FLORENCIA', descripcionEn: 'Peach juice, white wine, kiwi, lime, and peach liqueur', subcategoriaEn: 'house cocktails' },
  'beb-056': { nombreEn: 'VENUS', descripcionEn: 'Rosé wine, ginger, lime, cherry essence, and strawberry', subcategoriaEn: 'house cocktails' },
  'beb-057': { nombreEn: 'MEDUSA', descripcionEn: 'Bougainvillea tea, red wine, lime', subcategoriaEn: 'house cocktails' },
  'beb-058': { nombreEn: 'APEROL SPRITZ', descripcionEn: 'Aperol, prosecco, and soda', subcategoriaEn: 'house cocktails' },
  'beb-059': { nombreEn: 'SAN GERMAIN SPRITZ', descripcionEn: 'St. Germain, prosecco, and sparkling water', subcategoriaEn: 'house cocktails' },
  'beb-060': { nombreEn: 'FANTASIA IN VENICE', descripcionEn: 'Red wine, orange soda, tapioca, cherry essence, and lime', subcategoriaEn: 'house cocktails' },
  'beb-061': { nombreEn: 'FORESTA', descripcionEn: 'Prosecco, sparkling water, lime, and kiwi', subcategoriaEn: 'house cocktails' },
  'beb-062': { nombreEn: 'GALILEO GALILEI', descripcionEn: 'Red wine, lemon tea, lime, and Hpnotiq', subcategoriaEn: 'house cocktails' },
  'beb-063': { nombreEn: 'CALIGULA', descripcionEn: 'Prosecco, berries, cranberries, cherry essence, and lime', subcategoriaEn: 'house cocktails' },
  'beb-064': { nombreEn: 'ROMA', descripcionEn: 'Blue curaçao, grapefruit, lime, pineapple, and passion fruit', subcategoriaEn: 'house cocktails' },
  'beb-065': { nombreEn: 'CLERICOT', descripcionEn: 'White wine with seasonal fruits', subcategoriaEn: 'house cocktails' },

  // WHITE WINES
  'beb-066': { nombreEn: 'Roccaventosa', descripcionEn: 'Italian white wine', subcategoriaEn: 'white wines' },
  'beb-067': { nombreEn: 'Pinot Grigio Terre de Abruzzo', descripcionEn: 'Pinot Grigio, Italy - Glass', subcategoriaEn: 'white wines' },
  'beb-068': { nombreEn: 'Monte Xanic Viña Kristel', descripcionEn: 'Sauvignon Blanc, Mexico', subcategoriaEn: 'white wines' },
  'beb-069': { nombreEn: 'LA. Cetto Fumé Blanc', descripcionEn: 'Sauvignon Blanc, Mexico', subcategoriaEn: 'white wines' },
  'beb-070': { nombreEn: 'Santo Tomas 1.8.', descripcionEn: 'Chenin Blanc, Colombard, Mexico', subcategoriaEn: 'white wines' },
  'beb-071': { nombreEn: 'Pan y Lola', descripcionEn: 'Albariño, Spain', subcategoriaEn: 'white wines' },
  'beb-072': { nombreEn: 'Porta G Vinho Verde', descripcionEn: 'Arinto de Brilhacelas, Loureiro, Trajadura, Portugal', subcategoriaEn: 'white wines' },
  'beb-073': { nombreEn: 'Collevento 921 Prosecco', descripcionEn: 'Cuvée, Italy', subcategoriaEn: 'white wines' },

  // ROSÉ WINES
  'beb-074': { nombreEn: 'Casa Madero V.', descripcionEn: 'Shiraz, Mexico', subcategoriaEn: 'rosé wines' },
  'beb-075': { nombreEn: 'LA Cetto', descripcionEn: 'Zinfandel, Mexico', subcategoriaEn: 'rosé wines' },
  'beb-076': { nombreEn: 'Roccaventosa', descripcionEn: "Montepulciano, Cerasuolo D'Abruzzo - Glass $180", subcategoriaEn: 'rosé wines' },
  'beb-077': { nombreEn: 'Whispering Angel', descripcionEn: 'Grenache, Cinsault, Vermentino, France', subcategoriaEn: 'rosé wines' },

  // RED WINES
  'beb-078': { nombreEn: 'Santo Tomas Cabernet Sauvignon', descripcionEn: 'Cabernet Sauvignon, Mexico', subcategoriaEn: 'red wines' },
  'beb-079': { nombreEn: 'Merlot', descripcionEn: 'Merlot, Mexico - Glass', subcategoriaEn: 'red wines' },
  'beb-080': { nombreEn: 'Santo Tomas 31.8', descripcionEn: 'Tempranillo, Cabernet Sauvignon, Syrah, Mexico', subcategoriaEn: 'red wines' },
  'beb-081': { nombreEn: 'Santo Tomas Tempranillo', descripcionEn: 'Tempranillo, Cabernet Sauvignon, Mexico', subcategoriaEn: 'red wines' },
  'beb-082': { nombreEn: 'Monte Xanic Calixa', descripcionEn: 'Tempranillo, Cabernet Sauvignon, Mexico', subcategoriaEn: 'red wines' },
  'beb-083': { nombreEn: 'Monte Xanic Gran Ricardo', descripcionEn: 'Cabernet Sauvignon, Merlot, Cabernet Franc, Petit Verdot, Malbec, Mexico', subcategoriaEn: 'red wines' },
  'beb-084': { nombreEn: 'Casa Madero 3V', descripcionEn: 'Cabernet Sauvignon, Merlot, Tempranillo, Mexico', subcategoriaEn: 'red wines' },
  'beb-085': { nombreEn: 'Casa Madero 3V Gran Reserva', descripcionEn: 'Cabernet Sauvignon, Shiraz, Cabernet Franc, Mexico', subcategoriaEn: 'red wines' },
  'beb-086': { nombreEn: 'LA. Cetto Cabernet Sauvignon', descripcionEn: 'Cabernet Sauvignon, Mexico', subcategoriaEn: 'red wines' },
  'beb-087': { nombreEn: 'Predator', descripcionEn: 'Zinfandel, United States', subcategoriaEn: 'red wines' },
  'beb-088': { nombreEn: 'Caymus', descripcionEn: 'Cabernet Sauvignon, USA', subcategoriaEn: 'red wines' },
  'beb-089': { nombreEn: 'The Prisoner', descripcionEn: 'Zinfandel, Cabernet Sauvignon, Petit Sirah, Syrah, Charbono, USA', subcategoriaEn: 'red wines' },
  'beb-090': { nombreEn: 'Terraza de los Andes', descripcionEn: 'Argentina', subcategoriaEn: 'red wines' },
  'beb-091': { nombreEn: 'Clos de los Siete', descripcionEn: 'Argentina - Glass', subcategoriaEn: 'red wines' },
  'beb-092': { nombreEn: 'Pulpo Final', descripcionEn: 'Argentina', subcategoriaEn: 'red wines' },
  'beb-093': { nombreEn: 'Finca Las Moras', descripcionEn: 'Argentina', subcategoriaEn: 'red wines' },
  'beb-094': { nombreEn: 'Isla de Lobos', descripcionEn: 'Argentina', subcategoriaEn: 'red wines' },
  'beb-095': { nombreEn: 'Tannat', descripcionEn: 'Tannat, Uruguay', subcategoriaEn: 'red wines' },
  'beb-096': { nombreEn: 'Emilio Moro', descripcionEn: 'Tempranillo, Spain', subcategoriaEn: 'red wines' },
  'beb-097': { nombreEn: 'Finca Resalso, Emilio Moro', descripcionEn: 'Tempranillo, Spain', subcategoriaEn: 'red wines' },
  'beb-098': { nombreEn: 'Cal. Y Canto', descripcionEn: 'Tempranillo, Merlot, Syrah, Spain', subcategoriaEn: 'red wines' },
  'beb-099': { nombreEn: 'Matarromera Óinoz', descripcionEn: 'Tempranillo, Spain', subcategoriaEn: 'red wines' },
  'beb-100': { nombreEn: 'Malavida', descripcionEn: 'Tempranillo, Spain', subcategoriaEn: 'red wines' },
  'beb-101': { nombreEn: 'Porta G.', descripcionEn: 'Aragonez, Castelão, Portugal', subcategoriaEn: 'red wines' },
  'beb-102': { nombreEn: 'Roccaventosa Cabernet Sauvignon', descripcionEn: 'Cabernet Sauvignon, Italy', subcategoriaEn: 'red wines' },
  'beb-103': { nombreEn: "Colle Cavalieri Montepulciano D'Abruzzo", descripcionEn: "Montepulciano D'Abruzzo, Italy - Glass $150", subcategoriaEn: 'red wines' },
  'beb-104': { nombreEn: "Calù Nero D'Avola", descripcionEn: "Nero D'Avola, Italy - Glass $200", subcategoriaEn: 'red wines' },
  'beb-105': { nombreEn: 'Ruffino', descripcionEn: 'Sangiovese, Italy - Glass', subcategoriaEn: 'red wines' },
  'beb-106': { nombreEn: 'Maria Tinto', descripcionEn: 'Blend, Mexico', subcategoriaEn: 'red wines' },
  'beb-107': { nombreEn: 'Barolo Ravera 2017', descripcionEn: 'Abrigo Giovanni, Italy', subcategoriaEn: 'red wines' },
  'beb-108': { nombreEn: 'Barolo Ravera 2017 Reserva', descripcionEn: 'Abrigo Giovanni, Italy - Glass $500', subcategoriaEn: 'red wines' },
};

async function addTranslations() {
  try {
    console.log('Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('✅ MongoDB conectado\n');

    let updated = 0;
    for (const [id, translation] of Object.entries(translations)) {
      const result = await MenuItem.updateOne({ id }, { $set: translation });
      if (result.modifiedCount > 0) {
        updated++;
      }
    }

    console.log(`✅ Actualizados ${updated} items con traducciones al inglés`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

addTranslations();
