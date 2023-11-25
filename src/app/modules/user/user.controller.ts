import { Request, Response } from 'express';
import { userServices } from './user.service';
import { userSchemaValidation } from './user.validation';
import { productSchemaValidation } from '../product/product.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    const { error, value } = userSchemaValidation.validate(userData);

    if (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to create user!',
        error: {
          code: 500,
          description: 'Failed to create user!',
        },
      });
    } else {
      const result = await userServices.createUserIntoDB(value);
      res.status(200).json({
        success: true,
        message: 'User created successfully!',
        data: {
          userId: result.userId,
          username: result.username,
          fullName: result.fullName,
          age: result.age,
          email: result.email,
          isActive: result.isActive,
          hobbies: result.hobbies,
          address: result.address,
          _id: result._id,
          orders: result.orders,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create user!',
      error: {
        code: 500,
        description: 'Failed to create user!',
      },
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await userServices.getSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    await userServices.deleteUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userData = req.body;

    await userServices.updateUserInDB(userId, userData);
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
const addOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const product = req.body;

    const { error, value } = productSchemaValidation.validate(product);

    if (error) {
      res.status(500).json({
        success: false,
        message: 'Please provide valid data!',
        error: {
          code: 500,
          description: 'Failed to create order!',
        },
      });
    } else {
      await userServices.addOrderInDB(userId, value);
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// const addOrder = async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params;
//     const product = req.body;

//     await userServices.addOrderInDB(userId, product);
//     res.status(200).json({
//       success: true,
//       message: 'Order created successfully!',
//       data: null,
//     });
//   } catch (error) {
//     res.status(404).json({
//       success: false,
//       message: 'User not found',
//       error: {
//         code: 404,
//         description: 'User not found!',
//       },
//     });
//   }
// };

export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  deleteUser,
  updateUser,
  addOrder,
};
