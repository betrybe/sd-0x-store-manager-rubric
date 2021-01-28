const { body, validationResult } = require('express-validator');
const Joi = require('joi');
const numberZero = 0;
const statusUnprocessableEntity = 422;
const schema = Joi.array().items(
  Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().integer().min(1).required(),
  }).unknown(false),
);

const validateProduct = () => {
  console.log('fff', body);
  return [
    body('name', '"name" length must be at least 5 characters long')
      .exists()
      .isLength({ min: 6 }),
    body('quantity', '"quantity" must be a number')
      .exists()
      .isInt()
      .custom((quantity) => {
        if (quantity > numberZero) {
          return true;
        }
        throw new Error('"quantity" must be larger than or equal to 1');
      }),
  ];
};

const validate = (request, response, next) => {
  const errors = validationResult(request);
  if (errors.isEmpty()) return next();
  const normalizedErrors = errors.array().map((error) => error.msg);
  return response.status(statusUnprocessableEntity).send(
    { err: { message: normalizedErrors[0], code: 'invalid_data' } });
};

const validateSale = (request, response, next) => {
  const { error } = schema.validate(request.body, { convert: false });
  if (error) {
    return response
      .status(statusUnprocessableEntity)
      .send({ err: { message: 'Wrong product ID or invalid quantity',
        code: 'invalid_data' } });
  }
  next();
};

module.exports = {
  validateProduct,
  validate,
  validateSale,
};
