"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchemaValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.productSchemaValidation = joi_1.default.object({
    productName: joi_1.default.string()
        .required()
        .messages({ 'any.required': 'Product name is required' }),
    price: joi_1.default.number()
        .required()
        .messages({ 'any.required': 'Price is required' }),
    quantity: joi_1.default.number()
        .required()
        .messages({ 'any.required': 'Quantity is required' }),
});
