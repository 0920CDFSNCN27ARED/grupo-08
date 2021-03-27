const express = require('express');
const routes = express.Router();

const customerControllers = require('../controllers/customerControllers');
const withAuth = require('../middlewares/auth/withAuth');

const customerValidations = require('../middlewares/validations/customers.validations');

routes.get('/', (req, res) => res.redirect(301, '/clientes/mi-cuenta'));
routes.get('/login', customerControllers.login);
routes.post('/logged', customerControllers.logged);
routes.get('/logout', customerControllers.logout);

routes.get('/registro', customerControllers.register);

routes.post('/registered', customerValidations.registered, customerControllers.registered);

routes.get('/recuperar-cuenta', customerControllers.recover);

routes.get('/mi-cuenta', customerControllers.account);

module.exports = routes;
