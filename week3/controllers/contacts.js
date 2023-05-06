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
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('Test').collection('contacts').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]); // we just need the first one (the only one)
  });
};

const createContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
    const response = await mongodb.getDb().db('Test').collection('contacts').insertOne(contact);
    if (response .acknowledged) {
    res.status(201).json(response)
    } else {
    res.status(500).json(response.error || 'an error occured during creation of contact');
  }
};

const changeContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
    const response = await mongodb.getDb().db('Test').collection('contacts').replaceOne({_id: userId},contact);
    if (response .acknowledged) {
    res.status(201).json(response)
    } else {
    res.status(500).json(response.error || 'an error occured during creation of contact');
  }
};

const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('Test').collection('contacts').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'error while deleting contact')
  }
};


module.exports = { getAll,getSingle,createContact,changeContact,deleteContact};
