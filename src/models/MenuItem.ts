import mongoose, { Schema, Model } from 'mongoose';
import { MenuItem as IMenuItem } from '@/types/menu';

const menuItemSchema = new Schema<IMenuItem>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    nombre: {
      type: String,
      required: true,
      index: true,
    },
    nombreItalia: {
      type: String,
    },
    categoria: {
      type: String,
      required: true,
      enum: [
        'entradas',
        'bellarya-in-casa',
        'pescados',
        'pollo',
        'salmon',
        'pulpo',
        'camarones',
        'mejillones',
        'pizzas',
        'pastas',
        'postres',
        'bebidas',
        'vinos'
      ],
      index: true,
    },
    subcategoria: {
      type: String,
    },
    precio: {
      type: Number,
      required: true,
      min: 0,
    },
    descripcion: {
      type: String,
      required: true,
    },
    tiempoPrep: {
      type: Number,
      min: 0,
    },
    proteina: {
      type: [String],
    },
    picante: {
      type: Boolean,
      default: false,
    },
    destacado: {
      type: Boolean,
      default: false,
    },
    // Allergens
    alergenos: {
      type: [String],
      enum: ['gluten', 'lacteos', 'huevo', 'pescado', 'mariscos', 'frutos-secos', 'soja', 'apio', 'mostaza', 'sesamo', 'sulfitos'],
      default: [],
    },
    // English translations
    nombreEn: {
      type: String,
    },
    nombreItaliaEn: {
      type: String,
    },
    descripcionEn: {
      type: String,
    },
    subcategoriaEn: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: 'menuItems', // Explicitly specify collection name
  }
);

// Indexes for better query performance
menuItemSchema.index({ nombre: 'text', descripcion: 'text', nombreItalia: 'text' });
menuItemSchema.index({ categoria: 1, precio: 1 });

const MenuItem: Model<IMenuItem> =
  mongoose.models.MenuItem || mongoose.model<IMenuItem>('MenuItem', menuItemSchema);

export default MenuItem;
