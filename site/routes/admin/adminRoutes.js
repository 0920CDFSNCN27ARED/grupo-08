const express = require('express');
const routes = express.Router();

// Routes
const userRoutes = require('./userRoutes');
const catalogRoutes = require('./catalogRoutes');

routes.get('/', (req, res) => {
    res.render('admin/pages/index');
});

routes.use('/user', userRoutes);
routes.use('/c', catalogRoutes);

module.exports = routes;
