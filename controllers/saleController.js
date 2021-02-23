const Sale = require('../models/Sale');

const STATUS_200 = 200;
const STATUS_201 = 201;
const STATUS_404 = 404;
const STATUS_422 = 422;
const STATUS_500 = 500;
const FATAL_ERROR = 'Fatal Error';

const add = async (req, res) => {
  try {
    const sale = await Sale.add(req.body);

    return res.status(STATUS_200).json(sale);
  } catch (error) {
    return res.status(STATUS_500).json({ err: { message: FATAL_ERROR } });
  }
};

const getAll = async (req, res) => {
  try {
    const sales = await Sale.getAll();

    return res.status(STATUS_200).json({ sales });
  } catch (error) {
    return res.status(STATUS_500).json({ err: { message: FATAL_ERROR } });
  }
};

const show = async (req, res) => {
  try {
    const sale = await Sale.show(req.params.id);

    if (sale) return res.status(STATUS_200).json(sale);

    const err = {
      code: 'not_found',
      message: 'Sale not found',
    };
    return res.status(STATUS_404).json({ err });
  } catch (error) {
    return res.status(STATUS_500).json({ err: { message: FATAL_ERROR } });
  }
};

const edit = async (req, res) => {
  try {
    const { id } = req.params;

    await Sale.edit(id, req.body);

    return show(req, res);
  } catch (error) {
    return res.status(STATUS_500).json({ err: { message: FATAL_ERROR } });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const existsSale = await Sale.show(id);

    if (!existsSale) {
      const err = {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      };
      return res.status(STATUS_422).json({ err });
    }
    await show(req, res);
    return await Sale.remove(id);
  } catch (error) {
    return res.status(STATUS_500).json({ err: { message: FATAL_ERROR } });
  }
};

module.exports = {
  add,
  getAll,
  show,
  edit,
  remove,
};
