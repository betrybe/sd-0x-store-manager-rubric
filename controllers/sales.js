const salesModel = require('../model/sales');
const products = require('../model/products');
const statusSuccess = 200;
const statusNotFound = 404;
const numberZero = 0;
const statusUnprocessableEntity = 422;

const index = async (request, response) => {
  const sales = await salesModel.index();
  response.status(statusSuccess).json({ sales });
};

const indexId = async (request, response) =>
  salesModel
    .indexId(request.params.id)
    .then((sales) =>
      (sales
        ? response.status(statusSuccess).json(sales)
        : response.status(statusNotFound).send(
          { err: { message: 'Sale not found', code: 'not_found' } })))
    .catch(() => response.status(statusNotFound).send(
      { err: { message: 'Sale not found', code: 'not_found' } }));


const create = async ({ body }, response) => {
  console.log('salesss', body[0]);
  const sales = body;
  products.indexId(body[0].productId).then(({ name, quantity }) => {
    if ((quantity - body[0].quantity) < numberZero) {
      response.status(statusNotFound).send(
        { err: { message: 'Such amount is not permitted to sell',
          code: 'stock_problem' } });
    }
    const baixa = quantity - body[0].quantity;
    if (baixa > numberZero) {
      products.update(body[0].productId, { name, quantity: baixa });
    }
  });
  salesModel.create(sales).then((result) => 
    response.status(statusSuccess).json(result.ops[0]));
};

const update = async (request, response) => {
  const sales = request.body;
  const { id } = request.params;
  console.log('preco', sales);
  salesModel
    .update(id, sales)
    .then(() => response.status(statusSuccess).json(response.json(
      { _id: id, itensSold: sales })));
};

const deleteS = async (request, response) => {
  try {
    const sale = await salesModel.indexId(request.params.id);
    const { productId, quantity: t } = sale.itensSold[0];
    console.log('felipe', t);
    products.indexId(productId).then(({ name, quantity }) => {
      products.update(productId, { name, quantity: quantity + t });
    });
    const result = await salesModel.deleteS(request.params.id);
    if (result.n > numberZero) return response.status(statusSuccess).send('Sale deleted');
    response.status(statusSuccess).json(result);
  } catch (error) {
    response.status(statusUnprocessableEntity).send({ err: 
      { message: 'Wrong sale ID format',
        code: 'invalid_data' } });
  }
};

module.exports = { index, indexId, update, create, deleteS };
