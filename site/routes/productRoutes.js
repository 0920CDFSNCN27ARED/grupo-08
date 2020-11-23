const express = require('express');
const routes = express.Router();

const productControllers = require('../controllers/productControllers');

routes.get('/:categoria?/:subcategoria?', productControllers.gallery);
routes.get('/producto/:id_producto', productControllers.details);

module.exports = routes;
