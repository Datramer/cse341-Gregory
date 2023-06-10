const express = require('express');
const {auth, requiresAuth} = require('express-openid-connect');
const proContacts = require('../controllers/cardspecifics');

const router = express.Router();
router.get('/', proContacts.getAllStock);
router.get('/:id',requiresAuth(), proContacts.getSingleStock);
router.post('/', proContacts.createCardStock);
router.put('/:id',proContacts.changeCardStock);
router.delete('/:id',proContacts.deleteCardStock);

module.exports = router;
