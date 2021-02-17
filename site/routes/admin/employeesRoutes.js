const express = require('express');
const routes = express.Router();

const employeesControllers = require('../../controllers/admin/employeesControllers');


// Admin roles
routes.get('/', employeesControllers.getAll);
routes.get('/crear-rol', employeesControllers.getAll);
routes.post('/role/created', employeesControllers.created);

routes.get('/role/:id', employeesControllers.getOne);
routes.put('/role/:id/update', employeesControllers.update);

routes.delete('/role/:id/delete', employeesControllers.delete);


// Admin users






module.exports = routes;