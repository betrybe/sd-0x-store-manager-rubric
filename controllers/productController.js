const Product = require('../models/Product');

const add = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const product = await Product.add(name, quantity);

    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ err: { message: 'Fatal Error' } });
  }
};

const getAll = async (req, res) => {
  try {
    const products = await Product.getAll();

    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ err: { message: 'Fatal Error' } });
  }
};

const show = async (req, res) => {
  try {
    const product = await Product.show(req.params.id);

    if (product) return res.status(200).json(product);

    const err = {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
    return res.status(422).json({ err });
  } catch (error) {
    return res.status(500).json({ err: { message: 'Fatal Error' } });
  }
};

const edit = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    await Product.edit(id, name, quantity);

    return show(req, res);
  } catch (error) {
    return res.status(500).json({ err: { message: 'Fatal Error' } });
  }
};

const remove = async (req, res) => {
  try {
    await show(req, res);
    return await Product.remove(req.params.id);
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
