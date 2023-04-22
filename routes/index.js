const routes = require('express').Router();

const myController = require('../controllers')

routes.get('/', myController.tyler);

module.exports = routes;