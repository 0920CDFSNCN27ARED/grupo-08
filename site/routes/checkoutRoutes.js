const express = require('express');
const routes = express.Router();

const checkoutControllers = require('../controllers/checkoutControllers');

routes.get('/carrito', checkoutControllers.cart);
routes.post('/carrito/agregar', checkoutControllers.addToCart);
routes.post('/carrito/borrar/:id/:size/:customerId', checkoutControllers.removeFromCart);

module.exports = routes;
