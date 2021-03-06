const express = require('express');
const routes = express.Router();

const validations = require('../../middlewares/validations/admin.employees.validations');

const adminRolesControllers = require('../../controllers/admin/employees/rolesControllers');
const adminsControllers = require('../../controllers/admin/employees/adminsControllers');

routes.get('/', adminsControllers.getAll);

// Admin users
routes.get('/', adminsControllers.getAll);
routes.get('/list', adminsControllers.getAll);
//routes.get('/create', adminsControllers.create);

// Admin roles
routes.get('/crear-rol', adminRolesControllers.getAll);
routes.post('/role/created', validations.logged, adminRolesControllers.created);

routes.get('/role/:id', adminRolesControllers.getOne);
routes.put('/role/:id/update', validations.logged, adminRolesControllers.update);

routes.delete('/role/:id/delete', adminRolesControllers.delete);

module.exports = routes;
