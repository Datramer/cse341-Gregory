const mongodb = require('../db/connect');
const ObjectId =require('mongodb').ObjectId;
const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db('Test').collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists); // we just need the first one (the only one)
  });
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id)
  const result = await mongodb.getDb().db('Test').collection('contacts').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]); // we just need the first one (the only one)
  });
};

module.exports = { getAll,getSingle };
