const { produtoService } = require('../services');
const success = 200;
const unprocessable = 422;
const created = 201;

const getAllProdutos = async (_req, res) => {
  const products = await produtoService.getAllProdutos();

  return res.status(success).json({ products });
};

// criar produto
const criarProduto = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await produtoService.criarProduto(name, quantity);
  if (product.err) return res.status(unprocessable).json(product);

  return res.status(created).json(product);
};

// produto por Id
const findProdutoById = async (req, res) => {
  const { id } = req.params;
  const product = await produtoService.findProdutoById(id);

  if (product.err) return res.status(unprocessable).json(product);

  return res.status(success).json(...product);
};

// Atualiza Produto
const upProduto = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await produtoService.upProduto(id, name, quantity);

  if (product.err) return res.status(unprocessable).json(product);

  return res.status(success).json(product);
};

// Deleta Produto
const deleteProduto = async (req, res) => {
  const { id } = req.params;

  const product = await produtoService.deleteProduto(id);

  if (product && product.err) return res.status(unprocessable).json(product);

  return res.status(success).end();
};

module.exports = {
  getAllProdutos,
  criarProduto,
  findProdutoById,
  upProduto,
  deleteProduto,
};
