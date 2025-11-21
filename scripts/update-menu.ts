import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || '';

interface MenuItem {
  nombre: string;
  nombreItalia?: string;
  precio: number;
  descripcion: string;
  categoria: string;
  descripcionEn: string;
  tiempoPrep?: number;
  proteina?: string[];
  picante?: boolean;
  preparadoEnMesa?: boolean;
}

const menuItems: MenuItem[] = [
  // ENTRADAS
  {
    nombre: 'Pan de Ajo Gratinado',
    precio: 100,
    descripcion: 'Pan tostado con un toque de mantequilla con ajo y mezcla de quesos',
    descripcionEn: 'Toasted bread with a touch of garlic butter and cheese blend',
    categoria: 'entradas',
  },
  {
    nombre: 'Champiñones al Ajillo',
    precio: 120,
    descripcion: 'Champiñón sarteneado con salsa al ajillo de la casa',
    descripcionEn: 'Sautéed mushrooms with house garlic sauce',
    categoria: 'entradas',
  },
  {
    nombre: 'Champiñones al Forno',
    precio: 130,
    descripcion: 'Champiñón horneado gratinado con láminas de queso parmesano',
    descripcionEn: 'Baked mushrooms au gratin with parmesan cheese slices',
    categoria: 'entradas',
  },
  {
    nombre: 'Espárragos a la Parmesana',
    precio: 140,
    descripcion: 'Espárragos horneados con un toque de parmesano GRANA PADANO',
    descripcionEn: 'Baked asparagus with a touch of GRANA PADANO parmesan',
    categoria: 'entradas',
  },
  {
    nombre: 'Aceitunas',
    precio: 160,
    descripcion: 'Blue Cheese, Pimientos y Anchoas',
    descripcionEn: 'Blue Cheese, Peppers and Anchovies',
    categoria: 'entradas',
  },
  {
    nombre: 'Queso Frito',
    precio: 170,
    descripcion: 'Queso Mozzarella fresco empanizado con pan de la casa con una salsa Pomodoro',
    descripcionEn: 'Fresh Mozzarella breaded with house bread with Pomodoro sauce',
    categoria: 'entradas',
  },
  {
    nombre: 'Carpaccio de Portobello',
    precio: 170,
    descripcion: 'Finas láminas de Portobello, bañados con una salsa negra, aceite de oliva y arúgula fresca',
    descripcionEn: 'Thin Portobello slices, bathed in black sauce, olive oil and fresh arugula',
    categoria: 'entradas',
  },
  {
    nombre: 'Carpaccio de Atún',
    precio: 180,
    descripcion: 'Láminas de Atún, bañados con una salsa Ponzu cítrica con rodajas de jalapeño',
    descripcionEn: 'Tuna slices, bathed in citrus Ponzu sauce with jalapeño slices',
    categoria: 'entradas',
    proteina: ['pescado'],
  },
  {
    nombre: 'Prosciutto',
    precio: 180,
    descripcion: '100grs. De Prosciutto finamente laminado en mesa, acompañado con pan tomate',
    descripcionEn: '100g of Prosciutto finely sliced at the table, served with tomato bread',
    categoria: 'entradas',
    proteina: ['cerdo'],
    preparadoEnMesa: true,
  },
  {
    nombre: 'Portobello Gratinado',
    precio: 180,
    descripcion: 'Portobello horneado, gratinado a 3 quesos Mozzarella, Gouda y Parmesano, acompañados con verduras',
    descripcionEn: 'Baked Portobello, au gratin with 3 cheeses Mozzarella, Gouda and Parmesan, served with vegetables',
    categoria: 'entradas',
  },
  {
    nombre: 'Tartar de Atún',
    precio: 180,
    descripcion: 'Atún fresco en cubos con un toque de aguacate y una salsa Ponzu',
    descripcionEn: 'Fresh tuna cubes with a touch of avocado and Ponzu sauce',
    categoria: 'entradas',
    proteina: ['pescado'],
  },
  {
    nombre: 'Formaggio',
    precio: 180,
    descripcion: 'Es una mezcla de 4 quesos con espinaca, Jitomate Cherry horneado, acompañado de pan de la casa',
    descripcionEn: 'A blend of 4 cheeses with spinach, baked Cherry tomatoes, served with house bread',
    categoria: 'entradas',
  },
  {
    nombre: 'Hamburguesa de Portobello',
    precio: 200,
    descripcion: '200 grs. de carne de Res Choice, Portobello horneado gratinado con un toque de mostaza de Dijon',
    descripcionEn: '200g of Choice beef, baked Portobello au gratin with a touch of Dijon mustard',
    categoria: 'entradas',
    proteina: ['res'],
  },
  {
    nombre: 'Carpaccio Di Manzo',
    nombreItalia: 'Carpaccio Di Manzo',
    precio: 210,
    descripcion: 'Finas láminas de filete de lomo de Res con un toque de parmesano, Arúgula fresca y aceite de oliva a las finas hierbas y alcaparras',
    descripcionEn: 'Thin slices of beef tenderloin with a touch of parmesan, fresh arugula and olive oil with herbs and capers',
    categoria: 'entradas',
    proteina: ['res'],
  },
  {
    nombre: 'Carpaccio de Salmón',
    precio: 210,
    descripcion: 'Salmón fresco en corte de Sashimi bañado en salsa',
    descripcionEn: 'Fresh salmon in Sashimi cut bathed in sauce',
    categoria: 'entradas',
    proteina: ['pescado'],
  },
  {
    nombre: 'Pulpo Bañado',
    precio: 230,
    descripcion: 'Pulpo bañado, harinado, crocante con una salsa estilo Arrabiata con queso Grana Padano',
    descripcionEn: 'Battered octopus, crispy with Arrabiata style sauce and Grana Padano cheese',
    categoria: 'entradas',
    proteina: ['mariscos'],
    picante: true,
  },
  {
    nombre: 'Calamares Fritos',
    precio: 240,
    descripcion: 'Harinado, crocante con parmesano y toque de tártara',
    descripcionEn: 'Battered, crispy with parmesan and a touch of tartar',
    categoria: 'entradas',
    proteina: ['mariscos'],
    tiempoPrep: 20,
  },
  {
    nombre: 'Tabla de Quesos',
    precio: 310,
    descripcion: 'Queso Gouda, Queso Mozzarella, Blue Cheese, Queso de Cabra Cenizo, Queso Clásico Parmesano y Queso de Rancho de los Altos',
    descripcionEn: 'Gouda cheese, Mozzarella cheese, Blue Cheese, Ash Goat Cheese, Classic Parmesan cheese and Rancho de los Altos cheese',
    categoria: 'entradas',
  },
  {
    nombre: 'Tapas de Rib Eye',
    precio: 315,
    descripcion: 'Chicharrón de Rib Eye, con Pan Pita con un toque de guacamole, coronado con cebolla y cilantro',
    descripcionEn: 'Rib Eye chicharrón, with Pita bread with a touch of guacamole, topped with onion and cilantro',
    categoria: 'entradas',
    proteina: ['res'],
  },

  // PROTEINAS (BELLARYA IN CASA)
  {
    nombre: 'Lasaña Di Manzo',
    nombreItalia: 'Lasaña Di Manzo',
    precio: 180,
    descripcion: 'Pasta Lasaña con salsa tradicional de la casa, carne de res con una mezcla de quesos de la casa',
    descripcionEn: 'Lasagna pasta with traditional house sauce, beef with house cheese blend',
    categoria: 'proteinas',
    proteina: ['res'],
  },
  {
    nombre: 'Lasaña de Camarón',
    precio: 200,
    descripcion: 'Pasta Lasaña, una salsa clásica bechamel, Camarones a la mantequilla, pimientos y nuestra gran mezcla de quesos',
    descripcionEn: 'Lasagna pasta, classic bechamel sauce, butter shrimp, peppers and our great cheese blend',
    categoria: 'proteinas',
    proteina: ['mariscos'],
  },
  {
    nombre: "Filete al All'Asino",
    nombreItalia: "Filete al All'Asino",
    precio: 320,
    descripcion: 'Filete lomo de Res con una mantequilla de la casa',
    descripcionEn: 'Beef tenderloin with house butter',
    categoria: 'proteinas',
    proteina: ['res'],
  },
  {
    nombre: 'Rib Eye a las Finas hierbas',
    precio: 360,
    descripcion: '400g',
    descripcionEn: '400g',
    categoria: 'proteinas',
    proteina: ['res'],
    tiempoPrep: 20,
  },
  {
    nombre: 'Rib Eye a las Finas hierbas',
    precio: 520,
    descripcion: '600g',
    descripcionEn: '600g',
    categoria: 'proteinas',
    proteina: ['res'],
    tiempoPrep: 20,
  },
  {
    nombre: 'Tacos de Langosta',
    precio: 900,
    descripcion: 'Tortilla de lechuga romana, Cola de langosta acompañada con mantequilla clarificada y salsa de la casa',
    descripcionEn: 'Romaine lettuce tortilla, Lobster tail served with clarified butter and house sauce',
    categoria: 'proteinas',
    proteina: ['mariscos'],
    tiempoPrep: 20,
  },
  {
    nombre: 'Tomahawk Bellarya',
    precio: 1100,
    descripcion: '1kg a las finas hierbas y un toque de sal',
    descripcionEn: '1kg with herbs and a touch of salt',
    categoria: 'proteinas',
    proteina: ['res'],
    tiempoPrep: 40,
  },
  {
    nombre: 'Cola de Langosta Bellarya',
    precio: 2100,
    descripcion: 'Langosta a la mantequilla con cítricos',
    descripcionEn: 'Lobster with butter and citrus',
    categoria: 'proteinas',
    proteina: ['mariscos'],
    tiempoPrep: 40,
  },

  // POLLO
  {
    nombre: 'Pollo en Salsas de Queso',
    precio: 230,
    descripcion: 'Pollo en salsa con una mezcla de quesos de la casa',
    descripcionEn: 'Chicken in sauce with house cheese blend',
    categoria: 'proteinas',
    proteina: ['pollo'],
  },
  {
    nombre: 'Pollo a la Napolitana',
    precio: 230,
    descripcion: 'Pollo empanizado con pan toscano con salsa pomodoro y queso mozzarella fresco',
    descripcionEn: 'Breaded chicken with Tuscan bread with pomodoro sauce and fresh mozzarella cheese',
    categoria: 'proteinas',
    proteina: ['pollo'],
    tiempoPrep: 20,
  },
  {
    nombre: 'Pollo Arrabiata',
    precio: 230,
    descripcion: 'Pechuga de Pollo bañado de salsa picante con pomodoro y un toque de peperoncino',
    descripcionEn: 'Chicken breast bathed in spicy sauce with pomodoro and a touch of peperoncino',
    categoria: 'proteinas',
    proteina: ['pollo'],
    picante: true,
  },
  {
    nombre: 'Pollo Tropical',
    precio: 240,
    descripcion: 'Pechuga de Pollo horneada y sarteneada acompañada de mix de pimiento gratinado y un toque de tocino',
    descripcionEn: 'Baked and sautéed chicken breast served with au gratin pepper mix and a touch of bacon',
    categoria: 'proteinas',
    proteina: ['pollo'],
    tiempoPrep: 25,
  },

  // SALMÓN
  {
    nombre: 'Salmón a las Finas Hierbas',
    precio: 280,
    descripcion: 'Salmón horneado a la finas hierbas y un toque de mantequilla clarificada',
    descripcionEn: 'Baked salmon with fine herbs and a touch of clarified butter',
    categoria: 'proteinas',
    proteina: ['pescado'],
    tiempoPrep: 20,
  },
  {
    nombre: 'Salmón Nonna',
    precio: 280,
    descripcion: 'Salmón adobado con salsa de la casa de 7 chiles',
    descripcionEn: 'Marinated salmon with house 7 chiles sauce',
    categoria: 'proteinas',
    proteina: ['pescado'],
    tiempoPrep: 20,
    picante: true,
  },
  {
    nombre: 'Salmón Tropical',
    precio: 280,
    descripcion: 'Salmón horneado con mix de pimientos gratinados y un toque de tocino',
    descripcionEn: 'Baked salmon with au gratin pepper mix and a touch of bacon',
    categoria: 'proteinas',
    proteina: ['pescado'],
    tiempoPrep: 25,
  },
  {
    nombre: 'Salmón Bellarya',
    precio: 290,
    descripcion: 'Salmón horneado con finas hierbas en una cama de verduras y bastones de verdura',
    descripcionEn: 'Baked salmon with herbs on a bed of vegetables and vegetable sticks',
    categoria: 'proteinas',
    proteina: ['pescado'],
  },

  // PULPO
  {
    nombre: 'Pulpo Nonna',
    precio: 300,
    descripcion: 'Pulpo adobado con la salsa de casa de 7 chiles',
    descripcionEn: 'Marinated octopus with house 7 chiles sauce',
    categoria: 'proteinas',
    proteina: ['mariscos'],
    tiempoPrep: 20,
    picante: true,
  },
  {
    nombre: 'Pulpo Ajillo',
    precio: 300,
    descripcion: 'Pulpo adobado con el mero sabor al ajillo',
    descripcionEn: 'Marinated octopus with garlic flavor',
    categoria: 'proteinas',
    proteina: ['mariscos'],
    tiempoPrep: 20,
  },
  {
    nombre: 'Pulpo Marticciata',
    precio: 300,
    descripcion: 'Pulpo bañado en vino blanco con un toque de picante y salsa Arrabiata',
    descripcionEn: 'Octopus bathed in white wine with a touch of spice and Arrabiata sauce',
    categoria: 'proteinas',
    proteina: ['mariscos'],
    tiempoPrep: 30,
    picante: true,
  },
  {
    nombre: 'Pulpo a la Pratto',
    precio: 310,
    descripcion: 'Pulpo, camarón y marlín ahumado picado con cebolla y serrano',
    descripcionEn: 'Octopus, shrimp and smoked marlin chopped with onion and serrano',
    categoria: 'proteinas',
    proteina: ['mariscos'],
    tiempoPrep: 20,
    picante: true,
  },

  // CAMARONES
  {
    nombre: 'Camarones a la Diabla',
    precio: 270,
    descripcion: 'Camarones en salsa picante',
    descripcionEn: 'Shrimp in spicy sauce',
    categoria: 'proteinas',
    proteina: ['mariscos'],
    picante: true,
  },
  {
    nombre: 'Camarones a la Mantequilla',
    precio: 270,
    descripcion: 'Camarones en mantequilla',
    descripcionEn: 'Shrimp in butter',
    categoria: 'proteinas',
    proteina: ['mariscos'],
  },
  {
    nombre: 'Camarones al Mojo',
    precio: 270,
    descripcion: 'Camarones al mojo de ajo',
    descripcionEn: 'Shrimp in garlic sauce',
    categoria: 'proteinas',
    proteina: ['mariscos'],
  },
  {
    nombre: "Camarones All'Asino",
    nombreItalia: "Camarones All'Asino",
    precio: 270,
    descripcion: 'Camarones bañados de mantequilla, compuesta a base de romero, perejil, pimienta, sal y limón',
    descripcionEn: 'Shrimp bathed in butter, composed of rosemary, parsley, pepper, salt and lemon',
    categoria: 'proteinas',
    proteina: ['mariscos'],
  },
  {
    nombre: 'Gambas Cremosas',
    precio: 270,
    descripcion: 'Camarones con cabeza, con una mayonesa compuesta a base de chiles en un espejo de lechugas',
    descripcionEn: 'Head-on shrimp, with mayonnaise composed of chiles on a bed of lettuce',
    categoria: 'proteinas',
    proteina: ['mariscos'],
    picante: true,
  },
  {
    nombre: 'Camarones a la Nonna',
    precio: 280,
    descripcion: 'Camarones con una salsa de 7 chiles de la casa con un toque de aceite de oliva',
    descripcionEn: 'Shrimp with house 7 chiles sauce and a touch of olive oil',
    categoria: 'proteinas',
    proteina: ['mariscos'],
    picante: true,
  },
  {
    nombre: 'Camarón Diávolo',
    precio: 280,
    descripcion: 'Camarón picante cremoso con espárragos',
    descripcionEn: 'Spicy creamy shrimp with asparagus',
    categoria: 'proteinas',
    proteina: ['mariscos'],
    picante: true,
  },
  {
    nombre: 'Camarón Toscano',
    precio: 290,
    descripcion: 'Sobre un pan toscano camarón cremoso con peperoncino y jitomate Cherry, espolvoreado de perejil',
    descripcionEn: 'On Tuscan bread creamy shrimp with peperoncino and cherry tomatoes, sprinkled with parsley',
    categoria: 'proteinas',
    proteina: ['mariscos'],
    picante: true,
  },
  {
    nombre: 'Langostino Bellarya',
    precio: 350,
    descripcion: 'Langostino adobado con un adobo de salsas de 6 chiles con aderezo de mostaza y miel',
    descripcionEn: 'Marinated langostino with 6 chiles sauce blend with mustard and honey dressing',
    categoria: 'proteinas',
    proteina: ['mariscos'],
    tiempoPrep: 20,
    picante: true,
  },

  // PESCADOS
  {
    nombre: 'Pescado a la Nonna',
    precio: 300,
    descripcion: 'Pescado adobado con salsa de 7 chiles de la casa',
    descripcionEn: 'Fish marinated with house 7 chiles sauce',
    categoria: 'proteinas',
    proteina: ['pescado'],
    picante: true,
  },
  {
    nombre: 'Pescado al Chipotle',
    precio: 300,
    descripcion: 'Pescado con salsa cremosa de chipotle con un toque de mantequilla',
    descripcionEn: 'Fish with creamy chipotle sauce with a touch of butter',
    categoria: 'proteinas',
    proteina: ['pescado'],
    picante: true,
  },
  {
    nombre: 'Pescado a la Florentina',
    precio: 310,
    descripcion: 'Pescado al grill a las finas hierbas con mezcla de lechugas y bastones de verdura',
    descripcionEn: 'Grilled fish with herbs, mixed lettuces and vegetable sticks',
    categoria: 'proteinas',
    proteina: ['pescado'],
  },
  {
    nombre: 'Pescado a la Mantequilla',
    precio: 320,
    descripcion: 'Pescado con una mantequilla compuesta a base de romero, perejil, pimienta y limón',
    descripcionEn: 'Fish with compound butter based on rosemary, parsley, pepper and lemon',
    categoria: 'proteinas',
    proteina: ['pescado'],
  },
  {
    nombre: 'Pescado a la Sal',
    precio: 600,
    descripcion: 'A las finas hierbas en capa de sal',
    descripcionEn: 'With herbs in salt crust',
    categoria: 'proteinas',
    proteina: ['pescado'],
    tiempoPrep: 40,
  },

  // MEJILLONES
  {
    nombre: 'Mejillón al Vino Blanco',
    precio: 240,
    descripcion: 'Mejillones con mantequilla clarificada y vino blanco',
    descripcionEn: 'Mussels with clarified butter and white wine',
    categoria: 'proteinas',
    proteina: ['mariscos'],
  },
  {
    nombre: 'Mejillón Al Chef',
    precio: 240,
    descripcion: 'Mejillones con una salsa picante a base de peperoncino y salsa bechamel',
    descripcionEn: 'Mussels with spicy sauce based on peperoncino and bechamel sauce',
    categoria: 'proteinas',
    proteina: ['mariscos'],
    picante: true,
  },

  // SOPAS (categoría entradas)
  {
    nombre: 'Sopa Minestrón',
    precio: 140,
    descripcion: 'Sopa de verduras al mero estilo italiano con apio, zanahoria, papa y tomate',
    descripcionEn: 'Vegetable soup in true Italian style with celery, carrot, potato and tomato',
    categoria: 'entradas',
  },
  {
    nombre: 'Crema de Brócoli',
    precio: 140,
    descripcion: 'Clásica crema de brócoli con un toque de parmesano',
    descripcionEn: 'Classic broccoli cream with a touch of parmesan',
    categoria: 'entradas',
  },
  {
    nombre: 'Clam Chowder',
    precio: 190,
    descripcion: 'Clásica crema de almeja',
    descripcionEn: 'Classic clam chowder',
    categoria: 'entradas',
    proteina: ['mariscos'],
  },

  // ENSALADAS (categoría entradas)
  {
    nombre: 'Ensalada Cesar',
    precio: 155,
    descripcion: 'Preparada en mesa por nuestro capitán',
    descripcionEn: 'Prepared at the table by our captain',
    categoria: 'entradas',
    preparadoEnMesa: true,
  },
  {
    nombre: 'Ensalada Caprese',
    precio: 160,
    descripcion: 'Queso Mozzarella fresco, jitomate y albahaca',
    descripcionEn: 'Fresh Mozzarella cheese, tomato and basil',
    categoria: 'entradas',
  },
  {
    nombre: 'Ensalada Bella-Lato',
    precio: 170,
    descripcion: 'Mezcla de lechugas con nuez acaramelada, prosciutto y helado de hierba buena',
    descripcionEn: 'Mixed lettuces with caramelized walnuts, prosciutto and mint ice cream',
    categoria: 'entradas',
    proteina: ['cerdo'],
  },
  {
    nombre: 'Ensalada Di Mare',
    precio: 240,
    descripcion: 'Mezcla de mariscos, camarón, pulpo, mejillón y calamar con un toque de aceite de oliva y perejil',
    descripcionEn: 'Seafood mix, shrimp, octopus, mussel and squid with a touch of olive oil and parsley',
    categoria: 'entradas',
    proteina: ['mariscos'],
  },
  {
    nombre: 'Ensalada Caligula',
    precio: 280,
    descripcion: 'Mezcla de lechugas con vinagreta de frutos rojos y queso burrata',
    descripcionEn: 'Mixed lettuces with berry vinaigrette and burrata cheese',
    categoria: 'entradas',
  },

  // PIZZAS
  {
    nombre: 'Pizza Margarita',
    precio: 160,
    descripcion: 'Queso Mozzarella con albahaca y jitomate',
    descripcionEn: 'Mozzarella cheese with basil and tomato',
    categoria: 'pizzas',
  },
  {
    nombre: 'Pizza 4 Quesos',
    precio: 180,
    descripcion: 'Es nuestra Mezcla de 4 quesos de la casa',
    descripcionEn: 'Our house 4 cheese blend',
    categoria: 'pizzas',
  },
  {
    nombre: 'Pizza Pepperoni',
    precio: 180,
    descripcion: 'Pepperoni y cebolla morada',
    descripcionEn: 'Pepperoni and purple onion',
    categoria: 'pizzas',
    proteina: ['cerdo'],
  },
  {
    nombre: 'Pizza Especial de la Casa',
    precio: 199,
    descripcion: 'Aceituna negra, cebolla morada, alcaparra y salchicha italiana con un toque de jalapeño',
    descripcionEn: 'Black olive, purple onion, capers and Italian sausage with a touch of jalapeño',
    categoria: 'pizzas',
    proteina: ['cerdo'],
    picante: true,
  },
  {
    nombre: 'Pizza Prosciutto',
    precio: 225,
    descripcion: 'Láminas de prosciutto con arúgula fresca',
    descripcionEn: 'Prosciutto slices with fresh arugula',
    categoria: 'pizzas',
    proteina: ['cerdo'],
  },
  {
    nombre: 'Pizza Diávolo',
    precio: 250,
    descripcion: 'Mezcla de salsa arrabiata con salsa bechamel con camarones y espárragos',
    descripcionEn: 'Mix of arrabiata sauce with bechamel sauce with shrimp and asparagus',
    categoria: 'pizzas',
    proteina: ['mariscos'],
    picante: true,
  },
  {
    nombre: 'Pizza Pulpo del Pratto',
    precio: 250,
    descripcion: 'Mezcla de Pulpo, camarón y marlín ahumado con serrano y cebolla morada',
    descripcionEn: 'Mix of octopus, shrimp and smoked marlin with serrano and purple onion',
    categoria: 'pizzas',
    proteina: ['mariscos'],
    picante: true,
  },
  {
    nombre: 'Pizza Venecia',
    precio: 250,
    descripcion: 'Hongo Portobello con queso de cabra cenizo, cebolla y salchicha italiana',
    descripcionEn: 'Portobello mushroom with ash goat cheese, onion and Italian sausage',
    categoria: 'pizzas',
    proteina: ['cerdo'],
  },

  // PASTAS
  {
    nombre: 'Pasta al Burro',
    precio: 120,
    descripcion: 'Mantequilla y parmesano',
    descripcionEn: 'Butter and parmesan',
    categoria: 'pastas',
  },
  {
    nombre: 'Pasta Pomodoro',
    precio: 140,
    descripcion: 'Clásica Pomodoro',
    descripcionEn: 'Classic Pomodoro',
    categoria: 'pastas',
  },
  {
    nombre: 'Pasta Alfredo',
    precio: 150,
    descripcion: 'Salsa 3 Quesos',
    descripcionEn: '3 Cheese sauce',
    categoria: 'pastas',
  },
  {
    nombre: 'Pasta Boloñesa',
    precio: 155,
    descripcion: 'Clásica Pasta',
    descripcionEn: 'Classic Pasta',
    categoria: 'pastas',
    proteina: ['res'],
  },
  {
    nombre: 'Pasta Arrabiata',
    precio: 155,
    descripcion: 'Pomodoro con un toque de picante y pimiento morrón',
    descripcionEn: 'Pomodoro with a touch of spice and bell pepper',
    categoria: 'pastas',
    picante: true,
  },
  {
    nombre: 'Pasta Pesto',
    precio: 155,
    descripcion: 'Salsa a base de piñón, albahaca, aceite de oliva y parmesano',
    descripcionEn: 'Sauce based on pine nuts, basil, olive oil and parmesan',
    categoria: 'pastas',
  },
  {
    nombre: 'Pasta Carbonara',
    precio: 155,
    descripcion: 'A base de huevo, tocino y parmesano',
    descripcionEn: 'Based on egg, bacon and parmesan',
    categoria: 'pastas',
    proteina: ['cerdo'],
  },
  {
    nombre: 'Pasta Diávolo',
    precio: 160,
    descripcion: 'Salsa a base de bechamel y arrabiata (cremosa picante)',
    descripcionEn: 'Sauce based on bechamel and arrabiata (creamy spicy)',
    categoria: 'pastas',
    picante: true,
  },
  {
    nombre: 'Peperoncino Verde',
    precio: 199,
    descripcion: 'Pasta con base de chile poblano y un toque de parmesano',
    descripcionEn: 'Pasta with poblano chile base and a touch of parmesan',
    categoria: 'pastas',
  },
  {
    nombre: 'Pasta Rosa',
    precio: 270,
    descripcion: 'Salsa cremosa a base de salmón con una combinación de jitomates de la casa',
    descripcionEn: 'Creamy sauce based on salmon with a combination of house tomatoes',
    categoria: 'pastas',
    proteina: ['pescado'],
  },
  {
    nombre: 'Frutti Di Mare',
    nombreItalia: 'Frutti Di Mare',
    precio: 280,
    descripcion: 'Mezcla de mariscos con un fondo de mariscos',
    descripcionEn: 'Seafood mix with seafood broth',
    categoria: 'pastas',
    proteina: ['mariscos'],
  },
  {
    nombre: 'Grana Bellarya',
    precio: 360,
    descripcion: 'Pasta fettuccini con una salsa cremosa de la casa con aceite de trufa y trufa en conserva',
    descripcionEn: 'Fettuccini pasta with creamy house sauce with truffle oil and preserved truffle',
    categoria: 'pastas',
    preparadoEnMesa: true,
  },
  {
    nombre: 'Fusilli Lágrimas de Pratto',
    precio: 360,
    descripcion: 'Salsa de 4 quesos con jitomates cherry frescos',
    descripcionEn: '4 cheese sauce with fresh cherry tomatoes',
    categoria: 'pastas',
  },

  // POSTRES
  {
    nombre: 'Cheese Cake',
    precio: 150,
    descripcion: 'Pastel de queso estilo New York',
    descripcionEn: 'New York style cheesecake',
    categoria: 'postres',
  },
  {
    nombre: 'Coliseo de Chocolate',
    precio: 160,
    descripcion: 'Postre de chocolate',
    descripcionEn: 'Chocolate dessert',
    categoria: 'postres',
  },
  {
    nombre: 'Tiramisu',
    precio: 160,
    descripcion: 'Clásico postre italiano',
    descripcionEn: 'Classic Italian dessert',
    categoria: 'postres',
  },
  {
    nombre: 'Brownie',
    precio: 160,
    descripcion: 'Brownie de chocolate',
    descripcionEn: 'Chocolate brownie',
    categoria: 'postres',
  },
  {
    nombre: 'Helado',
    precio: 60,
    descripcion: 'Helado',
    descripcionEn: 'Ice cream',
    categoria: 'postres',
  },

  // BEBIDAS - Cervezas
  {
    nombre: 'Corona Clara/Oscura',
    precio: 50,
    descripcion: 'Cerveza mexicana',
    descripcionEn: 'Mexican beer',
    categoria: 'bebidas',
  },
  {
    nombre: 'Victoria',
    precio: 50,
    descripcion: 'Cerveza mexicana',
    descripcionEn: 'Mexican beer',
    categoria: 'bebidas',
  },
  {
    nombre: 'Pacífico',
    precio: 50,
    descripcion: 'Cerveza mexicana',
    descripcionEn: 'Mexican beer',
    categoria: 'bebidas',
  },
  {
    nombre: 'Modelo Especial',
    precio: 60,
    descripcion: 'Cerveza mexicana',
    descripcionEn: 'Mexican beer',
    categoria: 'bebidas',
  },
  {
    nombre: 'Negra Modelo',
    precio: 60,
    descripcion: 'Cerveza oscura mexicana',
    descripcionEn: 'Mexican dark beer',
    categoria: 'bebidas',
  },
  {
    nombre: 'Stella Artois',
    precio: 65,
    descripcion: 'Cerveza belga',
    descripcionEn: 'Belgian beer',
    categoria: 'bebidas',
  },
  {
    nombre: 'Miller',
    precio: 65,
    descripcion: 'Cerveza americana',
    descripcionEn: 'American beer',
    categoria: 'bebidas',
  },
  {
    nombre: 'Heineken',
    precio: 65,
    descripcion: 'Cerveza holandesa',
    descripcionEn: 'Dutch beer',
    categoria: 'bebidas',
  },
  {
    nombre: 'Amstel Ultra',
    precio: 75,
    descripcion: 'Cerveza light',
    descripcionEn: 'Light beer',
    categoria: 'bebidas',
  },
  {
    nombre: 'Tecate',
    precio: 40,
    descripcion: 'Cerveza mexicana',
    descripcionEn: 'Mexican beer',
    categoria: 'bebidas',
  },
  {
    nombre: 'Tecate Light',
    precio: 40,
    descripcion: 'Cerveza light mexicana',
    descripcionEn: 'Mexican light beer',
    categoria: 'bebidas',
  },
  {
    nombre: 'XX Lager',
    precio: 40,
    descripcion: 'Cerveza mexicana',
    descripcionEn: 'Mexican beer',
    categoria: 'bebidas',
  },
  {
    nombre: 'XX Ámbar',
    precio: 55,
    descripcion: 'Cerveza ámbar mexicana',
    descripcionEn: 'Mexican amber beer',
    categoria: 'bebidas',
  },
  {
    nombre: 'Bohemia Clara/Oscura',
    precio: 60,
    descripcion: 'Cerveza premium mexicana',
    descripcionEn: 'Mexican premium beer',
    categoria: 'bebidas',
  },
  {
    nombre: 'Bohemia Kristal',
    precio: 60,
    descripcion: 'Cerveza premium mexicana',
    descripcionEn: 'Mexican premium beer',
    categoria: 'bebidas',
  },
  {
    nombre: 'Strongbow',
    precio: 60,
    descripcion: 'Sidra preparada',
    descripcionEn: 'Prepared cider',
    categoria: 'bebidas',
  },
  {
    nombre: 'Michelada',
    precio: 35,
    descripcion: 'Cerveza preparada con limón y sal',
    descripcionEn: 'Beer prepared with lemon and salt',
    categoria: 'bebidas',
  },

  // Cervezas Artesanales
  {
    nombre: 'Cañita',
    precio: 90,
    descripcion: 'Cerveza artesanal',
    descripcionEn: 'Craft beer',
    categoria: 'bebidas',
  },
  {
    nombre: 'California Ale',
    precio: 90,
    descripcion: 'Cerveza artesanal',
    descripcionEn: 'Craft beer',
    categoria: 'bebidas',
  },
  {
    nombre: 'Pale Ale',
    precio: 90,
    descripcion: 'Cerveza artesanal',
    descripcionEn: 'Craft beer',
    categoria: 'bebidas',
  },
  {
    nombre: 'Hazy Pale Ale',
    precio: 90,
    descripcion: 'Cerveza artesanal',
    descripcionEn: 'Craft beer',
    categoria: 'bebidas',
  },
  {
    nombre: 'Stout',
    precio: 90,
    descripcion: 'Cerveza artesanal oscura',
    descripcionEn: 'Dark craft beer',
    categoria: 'bebidas',
  },
  {
    nombre: 'IPA Ippolita',
    precio: 90,
    descripcion: 'Cerveza artesanal IPA',
    descripcionEn: 'IPA craft beer',
    categoria: 'bebidas',
  },
  {
    nombre: 'Sake Ale',
    precio: 90,
    descripcion: 'Cerveza artesanal con sake',
    descripcionEn: 'Craft beer with sake',
    categoria: 'bebidas',
  },
  {
    nombre: 'Neipolita',
    precio: 90,
    descripcion: 'Cerveza artesanal',
    descripcionEn: 'Craft beer',
    categoria: 'bebidas',
  },

  // Refrescos
  {
    nombre: 'Coca Cola',
    precio: 38,
    descripcion: 'Refresco',
    descripcionEn: 'Soft drink',
    categoria: 'bebidas',
  },
  {
    nombre: 'Coca Cola Light',
    precio: 38,
    descripcion: 'Refresco light',
    descripcionEn: 'Light soft drink',
    categoria: 'bebidas',
  },
  {
    nombre: 'Coca Zero',
    precio: 38,
    descripcion: 'Refresco sin azúcar',
    descripcionEn: 'Sugar-free soft drink',
    categoria: 'bebidas',
  },
  {
    nombre: 'Sprite',
    precio: 38,
    descripcion: 'Refresco de limón',
    descripcionEn: 'Lemon soft drink',
    categoria: 'bebidas',
  },
  {
    nombre: 'Fanta',
    precio: 38,
    descripcion: 'Refresco de naranja',
    descripcionEn: 'Orange soft drink',
    categoria: 'bebidas',
  },
  {
    nombre: 'Fresca',
    precio: 38,
    descripcion: 'Refresco de toronja',
    descripcionEn: 'Grapefruit soft drink',
    categoria: 'bebidas',
  },
  {
    nombre: 'Agua mineral Peñafiel',
    precio: 38,
    descripcion: 'Agua mineral',
    descripcionEn: 'Mineral water',
    categoria: 'bebidas',
  },
  {
    nombre: 'Perrier',
    precio: 65,
    descripcion: 'Agua mineral con gas',
    descripcionEn: 'Sparkling mineral water',
    categoria: 'bebidas',
  },
  {
    nombre: 'Agua de Piedra Grande',
    precio: 90,
    descripcion: 'Agua mineral premium',
    descripcionEn: 'Premium mineral water',
    categoria: 'bebidas',
  },
  {
    nombre: 'Limonada',
    precio: 50,
    descripcion: 'Limonada natural',
    descripcionEn: 'Natural lemonade',
    categoria: 'bebidas',
  },
  {
    nombre: 'Naranjada',
    precio: 50,
    descripcion: 'Naranjada natural',
    descripcionEn: 'Natural orangeade',
    categoria: 'bebidas',
  },

  // Café
  {
    nombre: 'Americano',
    precio: 45,
    descripcion: 'Café americano',
    descripcionEn: 'American coffee',
    categoria: 'bebidas',
  },
  {
    nombre: 'Espresso',
    precio: 50,
    descripcion: 'Café espresso',
    descripcionEn: 'Espresso coffee',
    categoria: 'bebidas',
  },
  {
    nombre: 'Espresso Doble',
    precio: 80,
    descripcion: 'Café espresso doble',
    descripcionEn: 'Double espresso',
    categoria: 'bebidas',
  },
  {
    nombre: 'Capuchino',
    precio: 85,
    descripcion: 'Café capuchino',
    descripcionEn: 'Cappuccino',
    categoria: 'bebidas',
  },
  {
    nombre: 'Chai',
    precio: 85,
    descripcion: 'Té chai',
    descripcionEn: 'Chai tea',
    categoria: 'bebidas',
  },
  {
    nombre: 'Affogato',
    precio: 100,
    descripcion: 'Helado con espresso',
    descripcionEn: 'Ice cream with espresso',
    categoria: 'bebidas',
  },
  {
    nombre: 'Carajillo',
    precio: 180,
    descripcion: 'Café con licor',
    descripcionEn: 'Coffee with liquor',
    categoria: 'bebidas',
  },
  {
    nombre: 'Canija',
    precio: 180,
    descripcion: 'Café especial',
    descripcionEn: 'Special coffee',
    categoria: 'bebidas',
  },
  {
    nombre: 'Chocolate Caliente',
    precio: 80,
    descripcion: 'Chocolate caliente',
    descripcionEn: 'Hot chocolate',
    categoria: 'bebidas',
  },
  {
    nombre: 'Frappuchino',
    precio: 100,
    descripcion: 'Café frío batido',
    descripcionEn: 'Blended iced coffee',
    categoria: 'bebidas',
  },
];

async function updateMenu() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('bellarya');
    const collection = database.collection('menuItems');

    // Delete all existing items
    const deleteResult = await collection.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} existing items`);

    // Insert new items
    const insertResult = await collection.insertMany(menuItems);
    console.log(`Inserted ${insertResult.insertedCount} new items`);

    // Show summary by category
    const categories = await collection.aggregate([
      {
        $group: {
          _id: '$categoria',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]).toArray();

    console.log('\nMenu items by category:');
    categories.forEach(cat => {
      console.log(`  ${cat._id}: ${cat.count} items`);
    });

    console.log('\n✅ Menu update completed successfully!');

  } catch (error) {
    console.error('Error updating menu:', error);
    throw error;
  } finally {
    await client.close();
  }
}

updateMenu();
