import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.get('/', userController.getAllUser);
router.post('/', userController.createUser);
router.get('/:userId', userController.getSingleUser);

export const userRoutes = router;
