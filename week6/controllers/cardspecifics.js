const mongodb = require('../db/connect');
const ObjectId =require('mongodb').ObjectId;
const getAll = async (req, res, next) => {
  try{
  const result = await mongodb.getDb().db('cardcollection').collection('cardspecifications').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
} catch {
  res.status(200).json('oh no! that didnt work....');
}
  };


const getSingle = async (req, res, next) => {
  try{
  const cardId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('cardcollection').collection('cardspecifications').find({ _id: cardId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
  } catch {
  res.status(200).json('oh no! that didnt work....');
}
  };

  
  const createCard = async (req, res) => {
    try{
    const card = {
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
      const response = await mongodb.getDb().db('cardcollection').collection('cardspecifications').insertOne(card);
      if (response .acknowledged) {
      res.status(201).json(response)
      } else {
      res.status(500).json(response.error || 'an error occured during creation of contact');
    }
  } catch {
    res.status(200).json('oh no! that didnt work....');
  }
  };


  const changeCard = async (req, res) => {
    try{
    const cardId = new ObjectId(req.params.id);
    const card = {
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
      const response = await mongodb.getDb().db('cardcollection').collection('cardspecifications').replaceOne({_id: cardId},card);
      if (response .acknowledged) {
      res.status(204).json(response)
      } else {
      res.status(500).json(response.error || 'an error occured during creation of contact');
    }
  } catch {
    res.status(200).json('oh no! that didnt work....');
  }
  };

  const deleteCard = async (req, res) => {
    try{
    const cardId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('cardcollection').collection('cardspecifications').deleteOne({ _id: cardId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'error while deleting contact')
    }
  } catch {
    res.status(200).json('oh no! that didnt work....');
  }
  };

module.exports = { getAll, getSingle, createCard, changeCard, deleteCard};