const express = require('express');
const routes = express.Router();

const productControllers = require('../controllers/productControllers');

routes.get('/categoria/:categoria/:subcategoria?', productControllers.gallery);
routes.get('/producto/:pname/:sku', productControllers.details);

module.exports = routes;
