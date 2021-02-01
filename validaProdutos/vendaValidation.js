const { produtoModel } = require('../models');
const notFound = 404;
const unprocessable = 422;
const zero = 0;
const validaQuantity = async ({ productId, quantity }) => {
  const product = await produtoModel.findProdutoById(productId);

  if (product[0].quantity - quantity <= zero) return notFound;

  if (typeof quantity === 'string' || quantity <= zero) return unprocessable;

  return true;
};

const vendaValidation = async (sales) => {
  const validation = await Promise.all(sales.map(validaQuantity));

  if (validation.includes(unprocessable)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }

  if (validation.includes(notFound)) {
    return {
      err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
      },
    };
  }

  return true;
};

module.exports = vendaValidation;
