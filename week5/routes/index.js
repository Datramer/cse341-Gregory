const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/cards', require('./cards'));

module.exports = router;