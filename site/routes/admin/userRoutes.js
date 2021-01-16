const express = require('express');
const routes = express.Router();

const userControllers = require('../../controllers/admin/userControllers');

routes.get('/login', userControllers.login);

module.exports = routes;