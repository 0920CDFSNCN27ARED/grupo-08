const express = require('express');
const routes = express.Router();

// Controllers
const mainControllers = require('../controllers/mainControllers');

routes.get('/', mainControllers.index);

module.exports = routes;
