const express = require('express');
const routes = express.Router();
const withAdminAuth = require('../../middlewares/auth/withAdminAuth');

// Routes
const userRoutes = require('./userRoutes');
const catalogRoutes = require('./catalogRoutes');

routes.get('/', withAdminAuth, (req, res) => {
    res.render('admin/pages/index');
});

routes.use('/c', withAdminAuth, catalogRoutes);
routes.use('/user', userRoutes);

module.exports = routes;
