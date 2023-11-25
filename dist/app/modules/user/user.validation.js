"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchemaValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userSchemaValidation = joi_1.default.object({
    userId: joi_1.default.number()
        .required()
        .messages({ 'any.required': 'User id is required' }),
    username: joi_1.default.string()
        .required()
        .messages({ 'any.required': 'User name is required' }),
    password: joi_1.default.string()
        .required()
        .messages({ 'any.required': 'Password is required' }),
    fullName: {
        firstName: joi_1.default.string()
            .required()
            .messages({ 'any.required': 'First name is required' }),
        lastName: joi_1.default.string()
            .required()
            .messages({ 'any.required': 'Last name is required' }),
    },
    age: joi_1.default.number().required().messages({ 'any.required': 'Age is required' }),
    email: joi_1.default.string()
        .required()
        .messages({ 'any.required': 'Email is required' }),
    isActive: joi_1.default.boolean().default(true),
    hobbies: joi_1.default.array()
        .items(joi_1.default.string())
        .required()
        .messages({ 'any.required': 'Hobbies is required' }),
    address: {
        street: joi_1.default.string()
            .required()
            .messages({ 'any.required': 'Street is required' }),
        city: joi_1.default.string()
            .required()
            .messages({ 'any.required': 'City is required' }),
        country: joi_1.default.string()
            .required()
            .messages({ 'any.required': 'Country is required' }),
    },
});
