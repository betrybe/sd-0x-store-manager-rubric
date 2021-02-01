const { Router } = require('express');
const rescue = require('express-rescue');

const { produtosController } = require('../controllers');

const products = Router();

products.get('/:id', rescue(produtosController.findProdutoById));
products.put('/:id', rescue(produtosController.upProduto));
products.delete('/:id', rescue(produtosController.deleteProduto));
products.get('/', rescue(produtosController.getAllProdutos));
products.post('/', rescue(produtosController.criarProduto));

module.exports = products;
