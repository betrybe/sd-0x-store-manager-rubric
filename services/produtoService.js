const { produtoModel } = require('../models');
const { produtoValidation } = require('../validaProdutos');
const vinteQuatro = 24;
const zero = 0;
const getAllProdutos = async () => produtoModel.getAllProdutos();

const criarProduto = async (name, quantity) => {
  const isValid = await produtoValidation(name, quantity);

  if (isValid.err) return isValid;

  return produtoModel.criarProduto(name, quantity);
};

const upProduto = async (id, name, quantity) => {
  const isValid = await produtoValidation(name, quantity, true);
  if (isValid.err) return isValid;

  return produtoModel.upProduto(id, name, quantity);
};

const findProdutoById = async (id) => {
  if (id.length < vinteQuatro) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  const pId = await produtoModel.findProdutoById(id);

  if (pId.length === zero) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  return pId;
};

const deleteProduto = async (id) => {
  if (id.length < vinteQuatro) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  await produtoModel.deleteProduto(id);
};

module.exports = {
  getAllProdutos,
  criarProduto,
  findProdutoById,
  upProduto,
  deleteProduto,
};
