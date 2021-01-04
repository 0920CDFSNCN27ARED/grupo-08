const express = require('express');
const routes = express.Router();

routes.get('/productos/', (req, res) => {
    res.render('admin/pages/products-list');
});

routes.get('/productos/crear', (req, res) => {
    res.render('products-list');
});

routes.get('/productos/:id', (req, res) => {
    res.render('products-list');
});

routes.get('/productos/:id/edit', (req, res) => {
    res.render('products-list');
});

module.exports = routes;
