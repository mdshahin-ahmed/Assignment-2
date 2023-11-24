import { Schema } from 'mongoose';
import { IProduct } from './product.interface';

export const productSchema = new Schema<IProduct>({
  productName: { type: String, required: [true, 'product name is required'] },
  price: { type: Number, required: [true, 'price is required'] },
  quantity: { type: Number, required: [true, 'quantity is required'] },
});
