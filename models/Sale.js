const conn = require('./connection');
const { ObjectId } = require('mongodb');

const add = async (itensSold) => {
  try {
    const db = await conn();
    const result = await db.collection('sales').insertOne({ itensSold });

    return result.ops[0];
  } catch (error) {
    return null;
  }
};

const getAll = async () => {
  try {
    const db = await conn();
    const data = await db.collection('sales').find({}).toArray();
    return data;
  } catch (error) {
    return null;
  }
};

const show = async (id) => {
  try {
    const db = await conn();
    return await db.collection('sales').findOne(ObjectId(id));
  } catch (error) {
    return null;
  }
};

const edit = async (id, itensSold) => {
  try {
    const db = await conn();
    return await db.collection('sales').updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold } },
    );
  } catch (error) {
    return null;
  }
};

const remove = async (id) => {
  try {
    const db = await conn();
    return await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  } catch (error) {
    return null;
  }
};

module.exports = {
  add,
  getAll,
  show,
  edit,
  remove,
};
