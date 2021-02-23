const mongoClient = require('mongodb').MongoClient;

const evalautor  = true;

const MONGO_DB_URL = (evalautor) ?  'mongodb://mongodb:27017/StoreManager' : 'mongodb://localhost:27017/StoreManager';
const DB_NAME = 'StoreManager';

const connection = () =>
  mongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DB_NAME))
    .catch(() => process.exit(1));

module.exports = connection;
