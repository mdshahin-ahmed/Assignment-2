"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const user_validation_1 = require("./user.validation");
const product_validation_1 = require("../product/product.validation");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const { error, value } = user_validation_1.userSchemaValidation.validate(userData);
        if (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to create user!',
                error: {
                    code: 500,
                    description: 'Failed to create user!',
                },
            });
        }
        else {
            const result = yield user_service_1.userServices.createUserIntoDB(value);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create user!',
            error: {
                code: 500,
                description: 'Failed to create user!',
            },
        });
    }
});
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userServices.getAllUserFromDB();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.userServices.getSingleUserFromDB(userId);
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        yield user_service_1.userServices.deleteUserFromDB(userId);
        res.status(200).json({
            success: true,
            message: 'User deleted successfully!',
            data: null,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const userData = req.body;
        yield user_service_1.userServices.updateUserInDB(userId, userData);
        res.status(200).json({
            success: true,
            message: 'User updated successfully!',
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const product = req.body;
        const { error, value } = product_validation_1.productSchemaValidation.validate(product);
        if (error) {
            res.status(500).json({
                success: false,
                message: 'Please provide valid data!',
                error: {
                    code: 500,
                    description: 'Failed to create order!',
                },
            });
        }
        else {
            yield user_service_1.userServices.addOrderInDB(userId, value);
            res.status(200).json({
                success: true,
                message: 'Order created successfully!',
                data: null,
            });
        }
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const getAllProductForSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.userServices.getAllProductForSingleUserFromDB(userId);
        res.status(200).json({
            success: true,
            message: 'Order fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const getTotalPriceOfOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.userServices.getTotalPriceOfOrderFromDB(userId);
        res.status(200).json({
            success: true,
            message: 'Total price calculated successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
exports.userController = {
    createUser,
    getAllUser,
    getSingleUser,
    deleteUser,
    updateUser,
    addOrder,
    getAllProductForSingleUser,
    getTotalPriceOfOrder,
};
