const mongodb = require('../db/connect');
const ObjectId =require('mongodb').ObjectId;
const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db('cardcollection').collection('cardspecifications').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
  };
const getSingle = async (req, res, next) => {
  const cardId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('cardcollection').collection('cardspecifications').find({ _id: cardId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
  };
  const createCard = async (req, res) => {
    const contact = {
      name: req.body.name,
      power: req.body.power,
      toughness: req.body.toughness,
      mana_Cost: req.body.mana_Cost,
      artist: req.body.artist,
      price: req.body.price,
      rarity: req.body.rarity,
      set: req.body.set,
      rulestext: req.body.rulestext,
      type: req.body.type,
      subtype: req.body.subtype,
      
    };
      const response = await mongodb.getDb().db('cardcollection').collection('cardspecifications').insertOne(contact);
      if (response .acknowledged) {
      res.status(201).json(response)
      } else {
      res.status(500).json(response.error || 'an error occured during creation of contact');
    }
  };

module.exports = { getAll, getSingle, createCard};