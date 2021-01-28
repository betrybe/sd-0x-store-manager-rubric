const { ObjectId } = require('mongodb');
const connect = require('./connection');

const getAllvendas = async () => 
  connect().then((db) => 
    db.collection('sales').find({}).toArray());

const findVendaById = async (id) =>
  connect().then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));

const criarVenda = async (itensSold) =>
  connect()
    .then((db) => db.collection('sales').insertOne({ itensSold }))
    .then(({ insertedId }) => ({
      _id: insertedId,
      itensSold,
    }));

const upVenda = async (id, itensSold) =>
  connect()
    .then((db) => db.collection('sales').updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold } }))
    .then(() => ({
      _id: id,
      itensSold,
    }));

const deleteVenda = async (id) =>
  connect().then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));

module.exports = {
  getAllvendas,
  criarVenda,
  findVendaById,
  upVenda,
  deleteVenda,
};
