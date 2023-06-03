const express = require('express');

const proContacts = require('../controllers/cardspecifics');

const router = express.Router();
router.get('/', proContacts.getAll);
router.get('/:id', proContacts.getSingle);
router.post('/', proContacts.createCard);
router.put('/:id',proContacts.changeCard);
router.delete('/:id',proContacts.deleteCard);

module.exports = router;
