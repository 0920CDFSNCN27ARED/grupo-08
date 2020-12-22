const express = require('express');
const routes = express.Router();

routes.get('/productos/:producto?/:pid', (req, res) => {
    res.send('productos');
});

routes.get('/producto/crear', (req, res) => {
    res.render('admin/pages/product-create');
});

routes.get('/categorias/:categoria?/id/:catid', (req, res) => {
    res.send('categoria');
});

routes.get('/categoria/crear', (req, res) => {
    res.send('crear categoria');
});

module.exports = routes;
