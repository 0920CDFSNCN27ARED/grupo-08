const express = require('express');
const routes = express.Router();

const validations = require('../../middlewares/validations/admin.customer.validations');

const customersControllers = require('../../controllers/admin/customers/customersControllers');

routes.get('/', customersControllers.getAll);

routes.get('/crear', customersControllers.create);
routes.post('/crear', validations.create, customersControllers.created);

routes.get('/:id', customersControllers.getOne);
routes.put('/:id/edit', customersControllers.update);
routes.get('/:id/delete', customersControllers.delete);

module.exports = routes;
