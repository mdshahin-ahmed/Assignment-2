import Joi from 'joi';

export const productSchemaValidation = Joi.object({
  productName: Joi.string()
    .required()
    .messages({ 'any.required': 'Product name is required' }),
  price: Joi.number()
    .required()
    .messages({ 'any.required': 'Price is required' }),
  quantity: Joi.number()
    .required()
    .messages({ 'any.required': 'Quantity is required' }),
});
