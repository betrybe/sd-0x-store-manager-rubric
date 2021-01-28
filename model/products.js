const { ObjectId } = require('mongodb');
const connection = require('../database/connection');
const productId = 0;

const index = () =>
  connection().then(async (schema) => schema.collection('products').find().toArray());

const indexId = (productId) => {
  if (!ObjectId.isValid(productId)) 
    return Promise.reject(new Error('Wrong id format'));

  return connection(productId).then((schema) =>
    schema.collection('products').findOne(ObjectId(productId)));
};

const create = (product) => {
  console.log('aquii', product);
  return connection()
    .then(async (schema) => {
      const productInfo = await schema.collection('products').
        findOne({ name: product.name });
      if (productInfo) throw new Error('Product already exists');
      return schema.collection('products').insertOne(product);
    })
    .then((result) => result.ops[0]);
};

const update = (productId, productUpdate) => {
  const { name, quantity } = productUpdate;
  if (!ObjectId.isValid(productId)) return Promise.reject(new Error('Wrong id format'));

  return connection().then((db) =>
    db.collection('products').updateOne({ _id: ObjectId(productId) },
      { $set: { name, quantity } }));
};

const deleteP = (productId) => {
  if (!ObjectId.isValid(productId)) 
    return Promise.reject(new Error('Wrong id format'));

  return connection()
    .then((schema) => schema.collection('products').deleteOne(
      { _id: ObjectId(productId) }))
    .then((result) => result);
};

module.exports = { index, indexId, create, update, deleteP };
