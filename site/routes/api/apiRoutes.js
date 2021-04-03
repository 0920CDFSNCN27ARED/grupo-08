const express = require('express');
const routes = express.Router();

// Validations
const validations = require('../../middlewares/validations/admin.customer.validations');

// Controllers
const customerController = require('../../controllers/api/customerControllers');

routes.get('/customers', customerController.getAll);

routes.post('/customers/create', validations.create, customerController.create);

routes.get('/customers/:id', customerController.getOne);
routes.put('/customers/:id/edit', customerController.update);
routes.delete('/customers/:id/delete', customerController.delete);

module.exports = routes;
