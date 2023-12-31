import { IProduct } from '../product/product.interface';
import { IUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (user: IUser) => {
  const result = await User.create(user);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await User.find().select(
    'username fullName age email address -_id',
  );
  return result;
};

const getSingleUserFromDB = async (userId: string) => {
  if (await User.isUserExists(userId)) {
    const result = await User.findOne({ userId }).select(
      '-password -_id -orders',
    );
    return result;
  } else {
    throw new Error('User already exist');
  }
};

const deleteUserFromDB = async (userId: string) => {
  if (await User.isUserExists(userId)) {
    const result = await User.deleteOne({ userId });
    return result;
  } else {
    throw new Error('User not exist');
  }
};
const updateUserInDB = async (userId: string, userData: IUser) => {
  if (await User.isUserExists(userId)) {
    const result = await User.updateOne(
      {
        userId: userId,
      },
      {
        $set: userData,
      },
      {
        new: true,
        runValidators: true,
      },
    );
    return result;
  } else {
    throw new Error('User not exist');
  }
};

const addOrderInDB = async (userId: string, product: IProduct) => {
  if (await User.isUserExists(userId)) {
    const result = await User.updateOne(
      {
        userId: userId,
      },
      {
        $push: {
          orders: product,
        },
      },
    );
    return result;
  } else {
    throw new Error('User not exist');
  }
};

const getAllProductForSingleUserFromDB = async (userId: string) => {
  if (await User.isUserExists(userId)) {
    const result = await User.findOne({ userId }).select('orders -_id');
    return result;
  } else {
    throw new Error('User already exist');
  }
};

const getTotalPriceOfOrderFromDB = async (userId: string) => {
  if (await User.isUserExists(userId)) {
    const result = await User.aggregate([
      {
        $match: { userId: Number(userId) },
      },

      {
        $unwind: '$orders',
      },

      {
        $group: {
          _id: '$_id',
          totalPrice: {
            $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
          },
        },
      },

      {
        $project: {
          _id: 0,
        },
      },
    ]);
    return result;
  } else {
    throw new Error('User already exist');
  }
};

export const userServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserInDB,
  addOrderInDB,
  getAllProductForSingleUserFromDB,
  getTotalPriceOfOrderFromDB,
};
