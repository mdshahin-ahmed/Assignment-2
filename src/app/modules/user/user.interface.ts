/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { IProduct } from '../product/product.interface';

export interface IUser {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders?: IProduct[];
}

export interface UserModel extends Model<IUser> {
  isUserExists(userId: string): Promise<IUser | null>;
}
