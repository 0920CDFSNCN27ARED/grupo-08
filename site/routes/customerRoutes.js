const express = require('express');
const routes = express.Router();

const customerControllers = require('../controllers/customerControllers');

routes.get('/login', customerControllers.login);
routes.get('/registro', customerControllers.register);
routes.get('/recuperar-cuenta', customerControllers.recover);

module.exports = routes;
