const productModel = require('../model/products');
const statusSuccess = 200;
const statusCreated = 201;
const statusUnprocessableEntity = 422;
const numberZero = 0;

const index = async (request, response) =>
  productModel.index().then((products) => 
    response.status(statusSuccess).json({ products }));

const indexId = async (request, response) =>
  productModel
    .indexId(request.params.id)
    .then((products) => response.status(statusSuccess).json(products))
    .catch(() =>
      response.status(statusUnprocessableEntity).send({ err: { message: 'Wrong id format',
        code: 'invalid_data' } }));

const create = async (request, response) => {
  const product = request.body;
  console.log('fdfdf', product);
  productModel
    .create(product)
    .then((result) => response.status(statusCreated).send(result))
    .catch(() =>
      response.status(statusUnprocessableEntity).send(
        { err: { message: 'Product already exists',
          code: 'invalid_data' } }));
};

const update = async (request, response) => {
  const productData = request.body;
  const { id } = request.params;

  productModel
    .update(id, productData)
    .then(() =>
      response
        .status(statusSuccess)
        .json(response.json({ _id: id, name: productData.name,
          quantity: productData.quantity })));
};

const deleteP = async (request, response) =>
  productModel
    .deleteP(request.params.id)
    .then(({ result }) =>
      (result.n > numberZero ? response.status(statusSuccess).send('Product deleted') :
        response.status(statusSuccess).json(result)))
    .catch(() =>
      response.status(statusUnprocessableEntity).send({ err: { message: 'Wrong id format',
        code: 'invalid_data' } }));

module.exports = { index, create, indexId, update, deleteP };
