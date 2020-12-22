const express = require('express');
const routes = express.Router();

// Routes
const catalogRoutes = require('./catalogRoutes');

routes.get('/', (req, res) => {
    res.send('Admin');
});

routes.use('/c', catalogRoutes);


module.exports = routes;
