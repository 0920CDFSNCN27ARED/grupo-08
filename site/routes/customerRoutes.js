const express = require('express');
const routes = express.Router();


const customerControllers = require('../controllers/customerControllers');
const withAuth = require('../middlewares/auth/withAuth');

routes.get('/', (req,res) => res.redirect(301, '/clientes/mi-cuenta'))
routes.get('/login', customerControllers.login);
routes.post('/logged', customerControllers.logged);
routes.get('/logout', customerControllers.logout);

routes.get('/registro', customerControllers.register);
routes.post('/registered', customerControllers.registered);


routes.get('/recuperar-cuenta', customerControllers.recover);


routes.get('/mi-cuenta', withAuth, customerControllers.account);


module.exports = routes;
