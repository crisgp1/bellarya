import mongoose from 'mongoose';

export interface ICategory {
  id: string;
  label: string;
  labelEn?: string;
  order: number;
  active: boolean;
}

const categorySchema = new mongoose.Schema<ICategory>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    label: {
      type: String,
      required: true,
      trim: true,
    },
    labelEn: {
      type: String,
      trim: true,
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.models.Category || mongoose.model<ICategory>('Category', categorySchema);

export default Category;
