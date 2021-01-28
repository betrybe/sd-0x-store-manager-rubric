const { vendasService } = require('../services');
const success = 200;
const unprocessable = 422;
const vinteQuatro = 24;
const notFound = 404;

const getAllVendas = async (_req, res) => {
  const sales = await vendasService.getAllVendas();

  return res.status(success).json({ sales });
};

const findVendaById = async (req, res) => {
  const { id } = req.params;
  const sale = await vendasService.findVendaById(id);

  if (sale.err) return res.status(notFound).json(sale);

  return res.status(success).json(sale);
};

const criarVenda = async (req, res) => {
  const sales = req.body;

  const createdSale = await vendasService.criarVenda(sales);

  if (createdSale.err) {
    if (createdSale.err.code === 'stock_problem') 
      return res.status(notFound).json(createdSale);
    return res.status(unprocessable).json(createdSale);
  }
  return res.status(success).json(createdSale);
};

const upVenda = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;

  const newSale = await vendasService.upVenda(id, sale);

  if (newSale.err) return res.status(unprocessable).json(newSale);

  return res.status(success).json(newSale);
};

const deleteVenda = async (req, res) => {
  const { id } = req.params;

  if (id.length < vinteQuatro) {
    return res.status(unprocessable).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    });
  }

  const sale = await vendasService.deleteVenda(id);

  if (sale && sale.err) return res.status(notFound).json(sale);

  return res.status(success).end();
};

module.exports = {
  getAllVendas,
  criarVenda,
  findVendaById,
  upVenda,
  deleteVenda,
};
