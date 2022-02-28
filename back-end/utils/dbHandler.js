const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017/";
const dataname = "khang-app";

function insertDocument(collection, obj, callback = () => {}) {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const dbo = db.db(dataname);
    dbo.collection(collection).insertOne(obj, (error, res) => {
      if (error) throw error;
      callback(res);
      db.close();
    });
  });
}
function findDocument(collection, obj, callback = () => {}) {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const dbo = db.db(dataname);
    dbo.collection(collection).findOne(obj, (error, res) => {
      if (error) throw error;
      callback(res);
      db.close();
    });
  });
}
function findDocuments(collection, obj, callback = () => {}) {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const dbo = db.db(dataname);
    dbo
      .collection(collection)
      .find(obj)
      .toArray((error, res) => {
        if (error) throw error;
        callback(res);
        db.close();
      });
  });
}
function deleteDocument(collection, obj, callback = () => {}) {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const dbo = db.db(dataname);
    dbo.collection(collection).deleteOne(obj, (error, result) => {
      if (error) throw error;
      callback(result);
      db.close();
    });
  });
}
function getLastestBookID(string, callback = () => {}) {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const dbo = db.db(dataname);
    dbo
      .collection("Books")
      .find({ bookID: new RegExp(string) })
      .sort({ bookID: -1 })
      .limit(1)
      .toArray((error, res) => {
        if (error) throw error;
        callback(res);
        db.close();
      });
  });
}
async function getLastestOrderID() {
  const db = await MongoClient.connect(url);
  const dbo = db.db(dataname);
  try {
    const result = await dbo.collection("Orders").find({}).sort({ orderID: -1 }).limit(1).toArray();
    return result[0]?.orderID;
  } catch (err) {
    console.error(err);
  } finally {
    db.close();
  }
}

module.exports = {
  insertDocument,
  findDocument,
  findDocuments,
  getLastestBookID,
  getLastestOrderID,
  deleteDocument,
};
