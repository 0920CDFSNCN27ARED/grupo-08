const express = require('express');
const routes = express.Router();

// Routes
const userRoutes = require('./userRoutes');
const catalogRoutes = require('./catalogRoutes');
const employeesRoutes = require('./employeesRoutes');
const customersRoutes = require('./customersRoutes');
const tablitasRoutes = require('./tablesRoutes');

routes.get('/', (req, res) => {
    res.render('admin/pages/index');
});

routes.use('/c', catalogRoutes);
routes.use('/user', userRoutes);
routes.use('/clientes', customersRoutes);
routes.use('/employees', employeesRoutes);
routes.use('/tablitas', tablitasRoutes);

module.exports = routes;
