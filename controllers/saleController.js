const Sale = require('../models/Sale');

const add = async (req, res) => {
  try {
    const sale = await Sale.add(req.body);

    return res.status(200).json(sale);
  } catch (error) {
    return res.status(500).json({ err: { message: 'Fatal Error' } });
  }
};

const getAll = async (req, res) => {
  try {
    const sales = await Sale.getAll();

    return res.status(200).json({ sales });
  } catch (error) {
    return res.status(500).json({ err: { message: 'Fatal Error' } });
  }
};

const show = async (req, res) => {
  try {
    const sale = await Sale.show(req.params.id);

    if (sale) return res.status(200).json(sale);

    const err = {
      code: 'not_found',
      message: 'Sale not found',
    };
    return res.status(404).json({ err });
  } catch (error) {
    return res.status(500).json({ err: { message: 'Fatal Error' } });
  }
};

const edit = async (req, res) => {
  try {
    const { id } = req.params;

    await Sale.edit(id, req.body);

    return show(req, res);
  } catch (error) {
    return res.status(500).json({ err: { message: 'Fatal Error' } });
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
      return res.status(422).json({ err });
    }
    await show(req, res);
    return await Sale.remove(id);
  } catch (error) {
    return res.status(500).json({ err: { message: 'Fatal Error' } });
  }
};

module.exports = {
  add,
  getAll,
  show,
  edit,
  remove,
};
