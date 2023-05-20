const express = require('express');

const proContacts = require('../controllers/cardspecifics');

const router = express.Router();
router.get('/', proContacts.getAll);
router.get('/:id', proContacts.getSingle);
router.post('/', proContacts.createCard);

module.exports = router;
