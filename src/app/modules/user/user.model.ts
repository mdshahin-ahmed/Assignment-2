/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import { productSchema } from '../product/product.model';

import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<IUser, UserModel>({
  userId: {
    type: Number,
    required: [true, 'User id is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'User name is required'],
    unique: true,
  },
  password: { type: String, required: [true, 'Password is required'] },
  fullName: {
    firstName: { type: String, required: [true, 'First name is required'] },
    lastName: { type: String, required: [true, 'Last name is required'] },
  },
  age: { type: Number, required: [true, 'Age is required'] },
  email: { type: String, required: [true, 'Email is required'] },
  isActive: { type: Boolean, default: true },
  hobbies: { type: [String], required: [true, 'Hobbies is required'] },
  address: {
    street: { type: String, required: [true, 'Street is required'] },
    city: { type: String, required: [true, 'City is required'] },
    country: { type: String, required: [true, 'Country is required'] },
  },
  orders: { type: [productSchema] },
});

userSchema.statics.isUserExists = async function (userId: string) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
