const conn = require('./connection');
const { ObjectId } = require('mongodb');

const add = async (name, quantity) => {
  try {
    const db = await conn();
    const result = await db.collection('products').insertOne({ name, quantity });

    return result.ops[0];
  } catch (error) {
    return null;
  }
};

const findByName = async (name) => {
  try {
    const db = await conn();
    return await db.collection('products').findOne({ name });
  } catch (error) {
    return null;
  }
};

const getAll = async () => {
  try {
    const db = await conn();
    const data = await db.collection('products').find({}).toArray();
    return data;
  } catch (error) {
    return null;
  }
};

const show = async (id) => {
  try {
    const db = await conn();
    return await db.collection('products').findOne(ObjectId(id));
  } catch (error) {
    return null;
  }
};

const edit = async (id, name, quantity) => {
  try {
    const db = await conn();
    return await db.collection('products').updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          name,
          quantity,
        },
      },
    );
  } catch (error) {
    return null;
  }
};

const remove = async (id) => {
  try {
    const db = await conn();
    return await db.collection('products').deleteOne({ _id: ObjectId(id) });
  } catch (error) {
    return null;
  }
};

module.exports = {
  add,
  findByName,
  getAll,
  show,
  edit,
  remove,
};
