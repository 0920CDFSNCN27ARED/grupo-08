const express = require('express');
const routes = express.Router();

const customersControllers = require('../../controllers/admin/customers/customersControllers');

routes.get('/', customersControllers.getAll);

routes.get('/crear', customersControllers.create);
routes.post('/crear', customersControllers.created);

routes.get('/:id', customersControllers.getOne);
routes.put('/:id/edit', customersControllers.update);
routes.delete('/:id/delete', customersControllers.delete);

module.exports = routes;
