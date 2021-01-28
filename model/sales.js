const { ObjectId } = require('mongodb');
const connection = require('../database/connection');

const index = async () => {
  const dbConnection = connection();
  const result = await dbConnection.then(async (db) => db.collection('sales').find());

  return result.toArray();
};

const indexId = (saleId) => {
  const id = !ObjectId.isValid(saleId);
  if (id) return Promise.reject(new Error('Wrong sale ID format'));

  const result = connection().
    then((schema) => schema.collection('sales').findOne(ObjectId(saleId)));
  return result;
};


const create = (sales) =>
  connection()
    .then((schema) => schema.collection('sales').insertOne({ itensSold: sales }))
    .then((result) => result);

const update = (saleId, saleUpdate) => {
  if (!ObjectId.isValid(saleId)) return Promise.reject(new Error('Wrong sale ID format'));

  return connection().then((db) =>
    db
      .collection('sales')
      .updateOne({ _id: ObjectId(saleId) }, { $set: { itensSold: saleUpdate } }));
};

const deleteS = async (saleID) => {
  if (!ObjectId.isValid(saleID)) return Promise.reject(new Error('Wrong sale ID format'));

  const result = await connection().then((schema) =>
    schema.collection('sales').deleteOne({ _id: ObjectId(saleID) }));

  return result;
};

module.exports = { index, indexId, update, deleteS, create };
