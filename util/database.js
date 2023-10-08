const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const url = process.env.DATABASE_URL;
const dbName = process.env.DB_DATABASE;
let _db;

const mongoConnect = async (callback) => {
  try {
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // console.log('Connected!')
    _db = client.db(dbName);
    callback();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw new Error('No database found');
};

module.exports = {
  mongoConnect,
  getDb,
};
