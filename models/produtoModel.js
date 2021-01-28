const { ObjectId } = require('mongodb');
const connect = require('./connection');

// Mostrar Produtos
const getAllProdutos = async () =>
  connect().then((db) => db.collection('products').find({}).toArray());

// Cria Produto
const criarProduto = async (name, quantity) =>
  connect()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then(({ insertedId }) => ({
      _id: insertedId,
      name,
      quantity,
    }));

// Procura produto por nome
const findProdutoByName = async (productName) =>
  connect().then((db) => db.collection('products').find({ name: productName }).toArray());

// Procura produto por Id
const findProdutoById = async (productId) =>
  connect().then((db) =>
    db
      .collection('products')
      .find({ _id: ObjectId(productId) })
      .toArray());

// Atualiza Produto
const upProduto = async (id, name, quantity) =>
  connect()
    .then((db) =>
      db.collection('products').updateOne(
        { _id: ObjectId(id) },
        { $set: { name, quantity } }))
    .then(() => ({
      _id: id,
      name,
      quantity,
    }));

// Deleta Produto
const deleteProduto = async (id) =>
  connect().then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));

module.exports = {
  getAllProdutos,
  criarProduto,
  findProdutoByName,
  findProdutoById,
  upProduto,
  deleteProduto,
};
