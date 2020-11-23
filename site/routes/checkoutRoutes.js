const express = require('express');
const routes = express.Router();

const checkoutControllers = require('../controllers/checkoutControllers');

routes.get('/carrito', checkoutControllers.cart);

module.exports = routes;
