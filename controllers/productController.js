const Product = require('../models/Product');

const STATUS_200 = 200;
const STATUS_201 = 201;
const STATUS_422 = 422;
const STATUS_500 = 500;
const FATAL_ERROR = 'Fatal Error';

const add = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const product = await Product.add(name, quantity);

    return res.status(STATUS_201).json(product);
  } catch (error) {
    return res.status(STATUS_500).json({ err: { message: FATAL_ERROR  } });
  }
};

const getAll = async (req, res) => {
  try {
    const products = await Product.getAll();

    return res.status(STATUS_200).json({ products });
  } catch (error) {
    return res.status(STATUS_500).json({ err: { message: FATAL_ERROR } });
  }
};

const show = async (req, res) => {
  try {
    const product = await Product.show(req.params.id);

    if (product) return res.status(STATUS_200).json(product);

    const err = {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
    return res.status(STATUS_422).json({ err });
  } catch (error) {
    return res.status(STATUS_500).json({ err: { message: FATAL_ERROR } });
  }
};

const edit = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    await Product.edit(id, name, quantity);

    return show(req, res);
  } catch (error) {
    return res.status(STATUS_500).json({ err: { message: FATAL_ERROR } });
  }
};

const remove = async (req, res) => {
  try {
    await show(req, res);
    return await Product.remove(req.params.id);
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
