import Joi from 'joi';

export const userSchemaValidation = Joi.object({
  userId: Joi.number()
    .required()
    .messages({ 'any.required': 'User id is required' }),
  username: Joi.string()
    .required()
    .messages({ 'any.required': 'User name is required' }),
  password: Joi.string()
    .required()
    .messages({ 'any.required': 'Password is required' }),
  fullName: {
    firstName: Joi.string()
      .required()
      .messages({ 'any.required': 'First name is required' }),
    lastName: Joi.string()
      .required()
      .messages({ 'any.required': 'Last name is required' }),
  },
  age: Joi.number().required().messages({ 'any.required': 'Age is required' }),
  email: Joi.string()
    .required()
    .messages({ 'any.required': 'Email is required' }),
  isActive: Joi.boolean().default(true),
  hobbies: Joi.array()
    .items(Joi.string())
    .required()
    .messages({ 'any.required': 'Hobbies is required' }),
  address: {
    street: Joi.string()
      .required()
      .messages({ 'any.required': 'Street is required' }),
    city: Joi.string()
      .required()
      .messages({ 'any.required': 'City is required' }),
    country: Joi.string()
      .required()
      .messages({ 'any.required': 'Country is required' }),
  },
});
