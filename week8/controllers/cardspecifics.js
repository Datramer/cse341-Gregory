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
    if (req.body.name != null && req.body.power != null && req.body.set != null  && req.body.toughness != null && req.body.mana_Cost != null &&
      req.body.artist != null && req.body.price != null && req.body.rarity != null  && req.body.rulestext != null && req.body.type != null && req.body.subtype != null)
    {
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
      res.status(500).json(response.error || 'an error occured during creation of card');
    }
  } catch {
    res.status(200).json('oh no! that didnt work....');
  }
  }
  else {
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
      res.status(500).json(response.error || 'an error occured during creation of card');
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
      res.status(500).json(response.error || 'error while deleting card')
    }
  } catch {
    res.status(200).json('oh no! that didnt work....');
  }
  };




  const getAllStock = async (req, res, next) => {
    try{
    const result = await mongodb.getDb().db('cardcollection').collection('cardcatalog').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch {
    res.status(200).json('oh no! that didnt work....');
  }
    };
  
  
  const getSingleStock = async (req, res, next) => {
    try{
    const stockId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('cardcollection').collection('cardcatalog').find({ _id: stockId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
    } catch {
    res.status(200).json('oh no! that didnt work....');
  }
    };
  
    
    const createCardStock = async (req, res) => {
      if (req.body.cardId != null && req.body.cardCondition != null && req.body.Stock != null && req.body.location != null)
      {
      try{
      const card = {
        cardId: req.body.cardId,
        cardCondition: req.body.cardCondition,
        Stock: req.body.Stock,
        location: req.body.location,
      };
        const response = await mongodb.getDb().db('cardcollection').collection('cardcatalog').insertOne(card);
        if (response .acknowledged) {
        res.status(201).json(response)
        } else {
        res.status(500).json(response.error || 'an error occured during creation of stock');
      }
    } catch {
      res.status(200).json('oh no! that didnt work....');
    }
    }
    else { res.status(200).json('oh no! that didnt work....');}
    };
  
  
    const changeCardStock = async (req, res) => {
      try{
      const stockId = new ObjectId(req.params.id);
      const card = {
        cardId: req.body.cardId,
        cardCondition: req.body.cardCondition,
        Stock: req.body.Stock,
        location: req.body.location,
        
      };
        const response = await mongodb.getDb().db('cardcollection').collection('cardcatalog').replaceOne({_id: stockId},card);
        if (response .acknowledged) {
        res.status(204).json(response)
        } else {
        res.status(500).json(response.error || 'an error occured during creation of stock');
      }
    } catch {
      res.status(200).json('oh no! that didnt work....');
    }
    };
  
    const deleteCardStock = async (req, res) => {
      try{
      const stockId = new ObjectId(req.params.id);
      const response = await mongodb.getDb().db('cardcollection').collection('cardcatalog').deleteOne({ _id: stockId }, true);
      console.log(response);
      if (response.deletedCount > 0) {
        res.status(200).send();
      } else {
        res.status(500).json(response.error || 'error while deleting stock')
      }
    } catch {
      res.status(200).json('oh no! that didnt work....');
    }
    };



module.exports = { getAll, getSingle, createCard, changeCard, deleteCard, getAllStock, getSingleStock, createCardStock, changeCardStock, deleteCardStock};