const { vendasModel, produtoModel } = require('../models');
const { vendaValidation } = require('../validaProdutos/index');
const vinteQuatro = 24;
const getAllVendas = async () => vendasModel.getAllvendas();

const findVendaById = async (id) => {
  if (id.length < vinteQuatro) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }

  const saleId = await vendasModel.findVendaById(id);

  if (!saleId) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }

  return saleId;
};

const criarVenda = async (sales) => {
  const sale = await vendaValidation(sales);

  if (sale.err) return sale;

  await Promise.all(
    sales.map(async ({ productId, quantity }) => {
      const product = await produtoModel.findProdutoById(productId);
      console.log(product);
      const newStock = product[0].quantity - quantity;
      await produtoModel.upProduto(productId, product.name, newStock);
    }),
  );

  return vendasModel.criarVenda(sales);
};

const upVenda = async (id, itensSale) => {
  const itensSaleValidation = await vendaValidation(itensSale);

  if (itensSaleValidation.err) return itensSaleValidation;

  return vendasModel.upVenda(id, itensSale);
};

const deleteVenda = async (id) => {
  const found = await vendasModel.findVendaById(id);
  if (id.length < vinteQuatro) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }

  await Promise.all(
    found.itensSold.map(async ({ productId, quantity }) => {
      const product = await produtoModel.findProdutoById(productId);
      const newStock = product[0].quantity + quantity;
      await produtoModel.upProduto(productId, product.name, newStock);
    }),
  );

  await vendasModel.deleteVenda(id);
};

module.exports = {
  getAllVendas,
  criarVenda,
  findVendaById,
  upVenda,
  deleteVenda,
};
