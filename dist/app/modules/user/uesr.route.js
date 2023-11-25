"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.get('/', user_controller_1.userController.getAllUser);
router.post('/', user_controller_1.userController.createUser);
router.get('/:userId', user_controller_1.userController.getSingleUser);
router.delete('/:userId', user_controller_1.userController.deleteUser);
router.put('/:userId', user_controller_1.userController.updateUser);
router.put('/:userId/orders', user_controller_1.userController.addOrder);
router.get('/:userId/orders', user_controller_1.userController.getAllProductForSingleUser);
router.get('/:userId/orders/total-price', user_controller_1.userController.getTotalPriceOfOrder);
exports.userRoutes = router;
