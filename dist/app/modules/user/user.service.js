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
exports.userServices = void 0;
const user_model_1 = require("./user.model");
const createUserIntoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(user);
    return result;
});
const getAllUserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find().select('username fullName age email address -_id');
    return result;
});
const getSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExists(userId)) {
        const result = yield user_model_1.User.findOne({ userId }).select('-password -_id');
        return result;
    }
    else {
        throw new Error('User already exist');
    }
});
const deleteUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExists(userId)) {
        const result = yield user_model_1.User.deleteOne({ userId });
        return result;
    }
    else {
        throw new Error('User not exist');
    }
});
const updateUserInDB = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExists(userId)) {
        const result = yield user_model_1.User.updateOne({
            userId: userId,
        }, {
            $set: userData,
        }, {
            new: true,
            runValidators: true,
        });
        return result;
    }
    else {
        throw new Error('User not exist');
    }
});
const addOrderInDB = (userId, product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.updateOne({
        userId: userId,
    }, {
        $push: {
            orders: product,
        },
    });
    return result;
});
const getAllProductForSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExists(userId)) {
        const result = yield user_model_1.User.findOne({ userId }).select('orders -_id');
        return result;
    }
    else {
        throw new Error('User already exist');
    }
});
const getTotalPriceOfOrderFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExists(userId)) {
        const result = yield user_model_1.User.aggregate([
            // stage - 1
            {
                $match: { userId: Number(userId) },
            },
            // state - 2
            {
                $unwind: '$orders',
            },
            // state - 3
            {
                $group: {
                    _id: '$_id',
                    totalPrice: {
                        $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
                    },
                },
            },
            // state - 3
            {
                $project: {
                    _id: 0,
                },
            },
        ]);
        return result;
    }
    else {
        throw new Error('User already exist');
    }
});
exports.userServices = {
    createUserIntoDB,
    getAllUserFromDB,
    getSingleUserFromDB,
    deleteUserFromDB,
    updateUserInDB,
    addOrderInDB,
    getAllProductForSingleUserFromDB,
    getTotalPriceOfOrderFromDB,
};
