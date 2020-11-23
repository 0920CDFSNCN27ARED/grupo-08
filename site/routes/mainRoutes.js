const express = require('express');
const routes = express.Router();

// Controllers
const mainControllers = require('../controllers/mainControllers');

routes.get('/', mainControllers.index);
routes.get('*', mainControllers.notFound);

module.exports = routes;
