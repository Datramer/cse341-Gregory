const express = require('express');
const {auth, requiresAuth} = require('express-openid-connect');
const proContacts = require('../controllers/cardspecifics');


const router = express.Router();
router.get('/', proContacts.getAll);
router.get('/:id',requiresAuth(), proContacts.getSingle);
router.post('/', proContacts.createCard);
router.put('/:id',proContacts.changeCard);
router.delete('/:id',proContacts.deleteCard);

module.exports = router;
