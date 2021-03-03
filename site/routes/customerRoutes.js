const express = require('express');
const routes = express.Router();

const customerControllers = require('../controllers/customerControllers');
const withAuth = require('../middlewares/auth/withAuth');

routes.get('/login', customerControllers.login);
routes.post('/logged', customerControllers.logged);
routes.post('/logout', customerControllers.logout);

routes.get('/registro', customerControllers.register);
routes.post('/registered', customerControllers.registered);

routes.get('/recuperar-cuenta', customerControllers.recover);

routes.get('/mi-cuenta', customerControllers.account);

module.exports = routes;
