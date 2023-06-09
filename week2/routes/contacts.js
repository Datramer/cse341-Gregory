const express = require('express');

const proContacts = require('../controllers/contacts');

const router = express.Router();

// GET /feed/posts
router.get('/', proContacts.getAll);

router.get('/:id', proContacts.getSingle);
// localhost:8080/professional/
module.exports = router;
