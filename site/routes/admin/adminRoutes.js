const express = require('express');
const routes = express.Router();
const withAdminAuth = require('../../middlewares/auth/withAdminAuth');

// Routes
const userRoutes = require('./userRoutes');
const catalogRoutes = require('./catalogRoutes');
const employeesRoutes = require('./employeesRoutes');
const tablitasRoutes = require('./tablesRoutes');

routes.get('/', withAdminAuth, (req, res) => {
    res.render('admin/pages/index');
});

routes.use('/c', withAdminAuth, catalogRoutes);
routes.use('/user', userRoutes);
routes.use('/employees', withAdminAuth, employeesRoutes);
routes.use('/tablitas', withAdminAuth, tablitasRoutes);

module.exports = routes;
