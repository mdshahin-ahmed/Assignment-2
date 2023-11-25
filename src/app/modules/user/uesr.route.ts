import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.get('/', userController.getAllUser);
router.post('/', userController.createUser);
router.get('/:userId', userController.getSingleUser);
router.delete('/:userId', userController.deleteUser);
router.put('/:userId', userController.updateUser);
router.put('/:userId/orders', userController.addOrder);
router.get('/:userId/orders', userController.getAllProductForSingleUser);
router.get('/:userId/orders/total-price', userController.getTotalPriceOfOrder);

export const userRoutes = router;
