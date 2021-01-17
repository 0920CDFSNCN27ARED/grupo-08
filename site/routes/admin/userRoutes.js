const express = require('express');
const routes = express.Router();

const userControllers = require('../../controllers/admin/userControllers');

routes.get('/login', userControllers.login);
routes.post('/login', userControllers.logged);

routes.get('/register', userControllers.register);
routes.post('/register', userControllers.create);




module.exports = routes;