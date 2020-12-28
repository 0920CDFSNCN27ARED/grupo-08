const express = require('express');
const routes = express.Router();

// Routes
const catalogRoutes = require('./catalogRoutes');

routes.get('/', (req, res) => {
    res.render('admin/pages/index');
});

routes.use('/c', catalogRoutes);

module.exports = routes;
