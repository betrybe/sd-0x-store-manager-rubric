const { Router } = require('express');
const rescue = require('express-rescue');

const { vendasController } = require('../controllers/index');

const sales = Router();

sales.get('/', rescue(vendasController.getAllVendas));
sales.post('/', rescue(vendasController.criarVenda));
sales.get('/:id', rescue(vendasController.findVendaById));
sales.put('/:id', rescue(vendasController.upVenda));
sales.delete('/:id', rescue(vendasController.deleteVenda));

module.exports = sales;
